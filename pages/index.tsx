import * as React from 'react'
import '../resources/styles/styles.scss'
export default class extends React.Component<any, any> {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div className="container">    
        <div className="logo">  
          <img src="/skrilla.png"></img>
        </div>
        <div className="login">
            <form >
                <label className="form-cont" >
                    <p className="text-cont">Email</p>
                    <input type="text" name="email"></input>
                </label>
                <label className="form-cont">
                    <p className="text-cont">Password</p>
                    <input type="password" name="password"></input>
                </label>
                <label className="subm-cont">
                    <input type="submit" value="Log In" ></input>
                </label>
            </form>
            <p className="forg-pass">Forgot your password?</p>
        </div>
      </div>
    )
  }
}
