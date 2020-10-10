const loginAction = token => {
  return {
    type: "login",
    payload: token
  }
}

export const logoutAction = () =>{
  return {
    type: "logout"
  }
}

export default loginAction;
