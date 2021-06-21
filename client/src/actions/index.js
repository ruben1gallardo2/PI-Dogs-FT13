export const getDogByType = (raza) => {
  return async function(dispatch){
    dispatch({ type: "SET_LOADER", payload: true })
    let p = null
    try {
      p = await fetch (`http://localhost:3002/dogs?name=${raza}`)
      p = await p.json()
    } catch (e) {
      console.error(e)
    }
    dispatch({ type: "GET_ALL_DOGS", payload: p })
    dispatch({ type: "SET_PAGE", payload: 1})
    dispatch({ type: "SET_LOADER", payload: false })
  }
}

export const getAllDogs = (dogs) => {
  return async function(dispatch){
    let p = null
    try {
      p = await fetch ('http://localhost:3002/dogs')
      p = await p.json()
    } catch (e) {
      console.error(e)
    }
    dispatch({
      type: "GET_ALL_DOGS",
      payload: p
    })
  }
 }

export const getDogById = (id) => {
  return async function(dispatch){
    dispatch({ type: "SET_LOADER", payload: false })
    let p = null
    try {
      p = await fetch (`http://localhost:3002/dogs/${id}`)
      p = await p.json()
    } catch (e) {
      console.error(e)
    }
    dispatch({ type: "GET_DOG_BY_ID", payload: p })
    dispatch({ type: "SET_PAGE", payload: 1})
    dispatch({ type: "SET_LOADER", payload: false })
  }
}

export const getTemperament = (temperament) => {
  return async function(dispatch){
    dispatch({ type: "SET_LOADER", payload: false })
    let p = null
    try {
      p = await fetch (`http://localhost:3002/temperament`)
      p = await p.json()
    } catch (e) {
      console.error(e)
    }
    dispatch({ type: "GET_TEMPERAMENT", payload: p })
  }
} 

export const getDogByTemperament = (value) => {
  return {
    type: "GET_DOG_BY_TEMPERAMENT",
    payload: value
  }
}

export const sortDogs = (value) => {
  return {
    type: "SORT_DOGS",
    payload: value
  }
}

export const setPage = (value) => {
  return {
    type: "SET_PAGE",
    payload: value
  }
}

export const setLoader = (value) => {
  return {
    type: "SET_LOADER",
    payload: value
  }
}

