import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/navbar.css'

function Navbar() {
  
  return (
    <div>
      <div className="navbar">
        <nav>
          <Link to="/">Inicio</Link>
          <Link to="/dogs">Ver perros</Link>
          <Link to="/dog">Agregar perro</Link>
        </nav>
      </div>
    </div>
  )
}

export default Navbar
