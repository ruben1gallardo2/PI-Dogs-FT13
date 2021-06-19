import React, { useState, useEffect } from 'react'
import { Router, Link } from 'react-router-dom'
import '../styles/inicio.css'

function Inicio() {

  


  

  

  
  return (
      <div className="inicio" style={{backgroundImage: `url(/img/img-1.jpeg)`}}>
        <Link to="/principal">
          <span><h2>Ve a la pagina principal</h2></span>
        </Link>
        <h4>Disfruta de la pagina web perruna</h4>
      </div>
  )
}

export default Inicio
