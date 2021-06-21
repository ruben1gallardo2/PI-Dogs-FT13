const getAllDogs = (dogs) => {
  return async function(dispatch){
    let p = null
    try {
      p = await fetch ('https://api.thedogapi.com/v1/breeds')
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

 export function getMovies(titulo) {
  return function (dispatch) {
    return fetch("http://www.omdbapi.com/?apikey=20dac387&s=" + titulo)
      .then((response) => response.json())
      .then((json) => {
        dispatch({ type: "GET_MOVIES", payload: json });
      });
  };
}
 