const { Router } = require('express');
const { Op } = require('sequelize')
const fetch = require('node-fetch')
const { conn } = require('../db.js')
const { raza_source, spacing } = require('../const')
const { Razas, Temperamentos, razas_temperamentos } = require('../db.js')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const API_URL = 'https://api.thedogapi.com/v1/breeds'
const router = Router();

//creo funcion asincrona para hacer peticiones a la api externa
async function get_dogs_api(query) {
  let ruta = API_URL
  if (query) {
    ruta = `${ruta}/search?name=${query}`
  }

  let dogs_api = null
  try {
    dogs_api = await fetch(ruta)
    dogs_api = await dogs_api.json()
  } catch (e) {
    return false
  }

  let result_api = dogs_api.map((val) => {
    let img = val.image ? val.image.url : 'https://placehold.co/600x400'
    let controller = false

    if (!val.image && val.reference_image_id && query) {
      img = `https://cdn2.thedogapi.com/images/${val.reference_image_id}.jpg` //alternar jpg a png

      // hay casos donde el formato de la imagen es .jp y otras .png
      //se Alterna entre ambos con un metodo head
      controller = true
    }

    let dogs = {
      id: val.id,
      nombre: val.name,
      imagen: img,
      altura: val.height.metric,
      peso: val.weight.metric,
      años_de_vida: val.life_span,
      temperamento: val.temperament,
      controller,
    }
    return dogs;
  })
  return result_api
}

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.post('/dog', (req, res) => {
  let { nombre, altura, peso, años_de_vida } = req.body

  Razas.create({
    nombre: nombre,
    altura: altura,
    peso: peso,
    años_de_vida: años_de_vida
  }).then(dog => {
    res.json(dog)
  }).catch(e => res.status(400).send(e))

});

router.get('/dogs', async (req, res) => {
  let query = null
  let local_query = undefined

  if (req.query.name) {
    query = req.query.name
    local_query = {
      where: {
        nombre: {
          [Op.iLike]: `%${req.query.name}%`
        }
      }
    }
  }
  let result_api = await get_dogs_api(query)
  if (!result_api) {
    res.status(500).json({ message: "error interno, no se pudo conectar a la API" })
    return
  }

  let dogs_local = null
  try {
    dogs_local = await Razas.findAll(local_query)
  } catch (e) {
    res.status(500).json({ message: "error interno, no se pudo conectar a la DB local" })
    return
  }

  let result_local = dogs_local.forEach(val => {
    val.id = val.id + spacing
  });

  let result = result_api.concat(result_local)
  // result.sort(() => Math.random() - 0.5);
  //paginacion para mostrar 8

  // let page = req.query.page || 1
  // let inicio = 0 + 8 * (page - 1)
  // let final = 8 + 8 * (page - 1)
  // let seleccion = result.slice(inicio, final)
  // seleccion = seleccion.filter(x => !!x)

  // for (let s of result) {
  //   if (s && s.controller) {
  //     let response = null
  //     let img_format = '.jpg'
  //     try {
  //       response = await fetch(s.imagen + ".jpg", {
  //         method: 'HEAD'
  //       })
  //     } catch (e) {
  //       console.error(e)
  //     }
  //     if (response.status !== 200) {
  //       img_format = '.png'
  //     }
  //     s.imagen += img_format
  //   }
  // }

  res.status(200).json(result)

})

router.get('/dogs/:id', async (req, res) => {

  const { id } = req.params

  if (Number(id) < spacing) {
    let result_api = await get_dogs_api()
    if (!result_api) {
      res.status(500).json({ message: "error interno, no se pudo conectar a la API" })
      return
    }

    let result = result_api.find(x => x.id == id)
    if (!result) return res.status(404).json({ message: "No encontrado" })

    return res.status(200).json(result)
  }

  let result_id = null

  try {
    result_id = await Razas.findOne({
      where: {
        id: id - spacing // en la db no tiene el + 1000, aplicamos espaciados para diferenciar los id's de la API y la DB
      },
      include: [Temperamentos]
    })
  } catch (e) {
    res.status(404).json({ message: "No encontrado" })
    return
  }
  res.status(200).json(result_id)
})

router.get('/temperament', async (req, res) => {

  let dogs_local = await Temperamentos.count()
  if (dogs_local <= 0) {
    let temperamento = null
    try {
      temperamento = await get_dogs_api()
    } catch (e) {
      res.status(404).json({ message: "Temperamento no encontrado" })
      return
    }
    let temp_dogs = temperamento.map(val => {
      if (!val.temperamento) return null
      return val.temperamento.split(', ')
    })
    temp_dogs = temp_dogs.flat()
    let arr_temp = temp_dogs.filter((x, i) => {

      return x !== null && temp_dogs.indexOf(x) === i
    })
    arr_temp = arr_temp.map(val => {
      return {
        nombre: val
      }
    })
    await Temperamentos.bulkCreate(arr_temp, { individualHooks: true }) // bulk create acepta arreglos y los inserta todos en una sola querie
  }
  dogs_local = await Temperamentos.findAll()
  res.status(200).json(dogs_local)
})

module.exports = router;
