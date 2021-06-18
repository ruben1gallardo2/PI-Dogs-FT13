import React, { useState } from 'react'
import '../styles/principal.css'

function Principal() {

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
  async function searchRaza() {
    let p = null
    try {
      p = await fetch(`http://localhost:3002/dogs?name=${input.raza}`)
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
        <button onClick={searchRaza}>Buscar</button>

        
          
          {peticion.map(value => {
            return (
              <table className="tabla">
                
                  
                  <tr>
                    <td><img src={value.imagen} alt="razas" /></td>
                    <td>{value.nombre}</td>
                    <td>{value.temperamento}</td>
                  </tr>
                
              </table>
            )
          })}
        
      </div>
    </div>
  )
}

export default Principal
