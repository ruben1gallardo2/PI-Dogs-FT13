import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getDogByType } from '../actions/index'
import { withRouter } from 'react-router-dom'
import Navbar from './Navbar'
import '../styles/principal.css'

function Principal(props) {
  

  const { history } = props;

  const dispatch = useDispatch()

  const [input, setInput] = useState({
    raza: "",
    temperament: ""
  })

  function handleChange(e) {
    const newInput = {
      ...input,
      [e.target.name]: e.target.value
    }
    setInput(newInput)
  }
  function executeDispatchs() {
    dispatch(getDogByType(input.raza))
    dispatch({ type: "GET_DOG_BY_TEMPERAMENT", payload: input.temperament })
    dispatch({ type: "SET_PAGE", payload: 1})
  }

  useEffect(() => {
    const fecthData = async () => {
      dispatch({ type: "SET_LOADER", payload: true })
      let dgs = null 
      try {
        dgs = await fetch('http://localhost:3002/dogs')
        dgs = await dgs.json()
      } catch (e) {
        console.error(e)
      }
      dispatch({ type: "GET_ALL_DOGS", payload: dgs })
      dispatch({ type: "SET_PAGE", payload: 1})
      dispatch({ type: "SET_LOADER", payload: false })
    } 
    const fetchTemp = async () => {
      let temp = null 
      try {
        temp = await fetch('http://localhost:3002/temperament')
        temp = await temp.json()
      } catch (e) {
        console.error(e)
      }
      dispatch({ type: "GET_TEMPERAMENT", payload: temp })
    }
    fetchTemp()
    fecthData()
  },[])


  const peticion = useSelector((state) => {
    return state.dogs_pag_actual
  })
  const pag = useSelector((state) => {
    let paginacion = []
    for (let i = 1; i <= state.cant_pag; i++) {
      paginacion.push(i)
    }
    return paginacion
  })
  const pagActual = useSelector((state) => {
    return state.pag_actual
  })
  const loader = useSelector((state) => {
    return state.loader
  })
  const select = useSelector((state) => {
    return state.temperaments
  })
  
  return (
    <div>   
      <Navbar></Navbar> 
      <div className="principal">
        <div className="search-section">
          <label name="razas">Indica la raza que deseas buscar</label>
          <input type="text" name="raza" value={input.raza} onChange={handleChange} />
          <div className="btn-section">   
            <select name="temperamentos" onChange={handleChange}>  
              {select.map(value => {
                return (
                  <option key={value.id} name="temperament" value={input.temperament}>{value.nombre}</option> 
                  )
                })} 
                
            </select>
              <button onClick={() => {executeDispatchs()}} className="buscar-query-btn">Ver razas</button>
          </div>
        </div>
        
        
        <div className="select-tmp">
          <main className="grid">
            <div className={loader ? "" : "not-display"}>
              <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
            </div>
            {!loader && peticion.map(value => {
              return (
                <article key={value.id}>
                  <img src={value.imagen ? value.imagen : 'https://placehold.co/600x400'} alt="razas imagen" />
                  <div className="text">
                    <h2>{value.nombre}</h2>
                    <p>{value.temperamento}</p>
                    <button onClick={() => history.push(`/dogs/${value.id}`)}>More information</button>
                  </div>
                </article>
                )
              })}
          </main>
        </div>
        {!loader && pag.map(val => {
          return (
            <button key={val} className={pagActual === val ? 'btn-pag-active' : 'btn-pag'}
              onClick={() => dispatch({ type: "SET_PAGE", payload: val })}>{val}</button>
          )
        })}
      </div>
    </div>
  )
}

export default withRouter(Principal)
