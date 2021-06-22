const initialState = {
  dogs: [],
  current_dog: {},
  temperaments: [],
  pag_actual: 1,
  cant_pag: 1,
  dogs_pag_actual: [],
  loader: false
}

function rootReducer(state = initialState, action) {
  switch (action.type) {

    case "GET_ALL_DOGS":
      return {
        ...state,
        dogs: action.payload,
        cant_pag: Math.ceil(action.payload.length / 8)
      } 
      
    case "SET_PAGE":
      let inicio = 0 + 8*(action.payload - 1) 
      let final = 8 + 8*(action.payload - 1) 

      final = Math.min(final,state.dogs.length -1)
      return {
        ...state,
        pag_actual: action.payload,
        dogs_pag_actual: state.dogs.slice(inicio, final)
      }

    case "SET_LOADER": 
      return {
        ...state,
        loader: action.payload
      }

    case "GET_DOG_BY_ID":
      return {
        ...state,
        current_dog: action.payload
      }
    case "GET_TEMPERAMENT": 
      return {
        ...state,
        temperaments: action.payload
      }
    
    case "GET_DOG_BY_TEMPERAMENT":
      return {
        ...state,
        dogs: state.dogs.filter(value => value && value.temperamento && value.temperamento.includes(action.payload))
      }

    case "SUBMIT_DOG": 
      return {
        ...state,
        dogs: state.dogs.push(action.payload)
      }
    default:
      return {
        ...state
      }  
  }
}
export default rootReducer;