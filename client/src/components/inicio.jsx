import React, { useState, useEffect } from 'react'
import { Router, Link, Switch, withRouter } from 'react-router-dom'
import '../styles/inicio.css'

function Inicio(props) {

  const { history } = props; 

  return (
    <div>
      <div className="relleno"></div>  
        <div className="inicio" >
          <h4>Bienvenidos a la app Perruna</h4>
          <button
            onClick={() => history.push('/dogs')}
          >
            Ir a la pagina principal
          </button>
          
        </div>
    </div>
  )
}

export default withRouter(Inicio)
