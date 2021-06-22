import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {submitDog} from '../actions/index'
import '../styles/addDog.css';

function AddDog() {

  const [input, setInput] = useState({
    nombre:"",
    altura:"",
    peso:"",
    años_de_vida:""
  })

  const dispatch = useDispatch()

  function handleChange(e) {
    const newInput = {
      ...input,
      [e.target.name]: e.target.value
    }
    setInput(newInput)
  }

  async function handleFormSubmit(value) {
    
    submitDog(value)
  }

  return (
    <div>
        <h1>Añade tu perro</h1>
      <div className="cont">  
        <form className="formulario" onSubmit={() => handleFormSubmit(input)}>
          <label name="nombre">Nombre</label>
          <input type="text" name="nombre" value={input.nombre} onChange={handleChange} required/>

          <label name="altura">Altura</label>
          <input type="text" name="altura" value={input.altura} onChange={handleChange} required/>

          <label name="peso">Peso</label>
          <input type="text" name="peso" value={input.peso} onChange={handleChange} required/>

          <label name="años_de_vida">Años de vida</label>
          <input type="text" name="años_de_vida" value={input.años_de_vida} onChange={handleChange} required/>

          <input className="submit-btn" type="submit" value="Añadir" />
        </form>
      </div>    
    </div>
  )
}

export default AddDog
