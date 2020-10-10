const initialState = {token: null}
export default function loginReducer(state = initialState, action) {
  if(action.type === "login"){
    return {
      ...state,
      token: action.payload
    }
  }
  else if(action.type === "logout"){
    return {
      ...state,
      token: null
    }
  }
  else {
    return state;
  }
}
