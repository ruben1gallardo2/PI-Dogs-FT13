import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getDogById } from '../actions/index'
import { useParams, withRouter } from 'react-router-dom'
import '../styles/dogs.css'

function Dogs(props) {

  const { history } = props
  const { id } = useParams()
  const dispatch = useDispatch()

  const dogId = useSelector((state) => {
    return state.current_dog
  })

  useEffect(() => {
    dispatch({ type: "SET_LOADER", payload: true })
   dispatch(getDogById(id))
   dispatch({ type: "SET_LOADER", payload: false })
  },[])
  console.log(dogId)
 
  return (
    <div className="dog">
      <main className="contenedor">
        <article>
          <img src={dogId.imagen ? dogId.imagen : 'https://placehold.co/600x400'} alt="razas imagen" />
          <div className="inside">
            <h2>{dogId.nombre}</h2>
              <p>{dogId.temperamento}</p>
              <p>peso: {dogId.peso}</p>
            <p>altura: {dogId.altura}</p>
            <p>años de vida: {dogId.años_de_vida}</p>
            <button onClick={() => history.goBack()}>volver</button>
          </div>
        </article>  
      </main>
      
    </div>
  )
}

export default Dogs;
