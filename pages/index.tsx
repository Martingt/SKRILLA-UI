import * as React from 'react'
import '../resources/styles/styles.scss'
import AuthService from '../utils/AuthService'

const auth = new AuthService('http://localhost:6001/connect')

export default class Login extends React.Component<any, any> {
  constructor(props) {
    super(props)
    this.state = {value: ''};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount () {
    if (auth.loggedIn()) {
      this.props.url.replaceTo('/homescreen')
    }
  }
  handleChange(e) {
    this.setState({value: e.target.value});
  }
  handleSubmit (e) {
    e.preventDefault()
    auth.login(this.refs.email.value, this.refs.password.value)
      .then(res => {
        console.log(res)
        this.props.url.replaceTo('/homescreen')
      })
      .catch(e => console.log(e)) 
  }

  render() {
    return(
      <div className="container">    
        <div className="logo">  
          <img src="/skrilla.png"></img>
        </div>
        <div className="login">
            <form onSubmit={this.handleSubmit} >
                <label className="form-cont" >
                    <p className="text-cont">Email</p>
                    <input type="text" name="email" ref="email"></input>
                </label>
                <label className="form-cont">
                    <p className="text-cont">Password</p>
                    <input type="password" name="password" ref="password"></input>
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
