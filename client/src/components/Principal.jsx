import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import '../styles/principal.css'

function Principal() {
  let ruta = 'http://localhost:3002/dogs'

  const [peticion, setPeticion] = useState([])

  const [input, setInput] = useState({
    raza:""
  })

  

  function handleChange(e) {
    const newInput = {
      ...input,
      [e.target.name]: e.target.value
    }
    setInput(newInput)
  }
  async function searchRazaQuery() { 
    if (input.raza) {
      ruta += `?name=${input.raza}`
    }
    let p = null
    try {
      p = await fetch(`${ruta}`)
      p = await p.json()
      
    } catch(e) {
      console.error(e)
    }
    setPeticion(p)
  }
  console.log('esto es la peticion: ', peticion)

  return (
    <div>
      <div className="principal">
        <label name="razas">Indica la raza que deseas buscar</label>
        <input type="text" name="raza" value={input.raza} onChange={handleChange} />
        <button onClick={searchRazaQuery}>Buscar</button>
        <main className="grid"> 
          {peticion.map(value => {
            return (  
              <article key={value.id}>
                <img src={value.imagen ? value.imagen : 'https://placehold.co/600x400'} alt="razas imagen" />
                <div className="text">
                  <h3>{value.nombre}</h3>
                  <p>{value.temperamento}</p>
                  <button>More information</button>
                </div>
              </article>
            )
          })}
        </main>
          
      </div>
    </div>
  )
}

export default Principal
