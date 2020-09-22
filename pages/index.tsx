
import * as React from 'react'
import '../resources/styles/styles.scss'
import AuthService from '../utils/AuthService'
import { Redirect } from "react-router-dom";
import ConsumptionList from '../components/ConsumptionList';
import {skrillaIcon } from '../resources/images/skrilla-icon.png';
const auth = new AuthService('http://localhost:6001/connect')

export default class Login extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      token:null,
      name: "",
      password:"",
      error:0
    };
     this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount () {
    this.setState({token: this.getAuthToken()});
  }
  handleChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }
  handleSubmit (e) {
    e.preventDefault();
    auth.login(this.state.email, this.state.password)
      .then(res => {
        if (res != undefined)
          this.setState({token: res});
        else
          this.setState({error: 1})
        console.log(res);

      })
      .catch(e => console.log(e))
  }

  getAuthToken(){
    let token = null;
    if (document.cookie.split(';').some((item) => item.trim().startsWith('token='))) {
      token = document.cookie
        .split("; ")
        .find(row => row.startsWith("token"))
        .split("=")[1];
      }
    return token;
  }



  render() {
    let error = (this.state.error == 1)? <p className="forg-pass">Wrong username or password</p>:null;
    let page = null;
    if(this.state.token !== null){
      page = <div className="mainContainer">
        <div className="mainContainerContent">
        <div className="containerTopBar">
        <div class="topBarLeft">
          <img src="/images/skrilla-icon.png" className="skrillaTopBarLogo"/>
          <h1 className="containerTopBarTitle">Consumos</h1>
          </div>
          <div style={{color:"#bbb"}}>Logout</div>
        </div>
        <ConsumptionList />
        </div>
      </div>
    }
    else
    {
      page = <div className="loginBody">
        <div className="logo">
          <img src="/images/skrilla-logo-large.png"></img>
        </div>
        <div className="login">
            <form onSubmit={this.handleSubmit} >
                <label className="form-cont" >
                    <p className="text-cont">Email</p>
                    <input type="text" name="email"
                    onChange={this.handleChange}></input>
                </label>
                <label className="form-cont">
                    <p className="text-cont">Password</p>
                    <input type="password" name="password"
                    onChange={this.handleChange}></input>
                </label>
                <label className="subm-cont">
                    <input type="submit" value="Log In" ></input>
                </label>
            </form>
            {error}
            <p className="forg-pass">Forgot your password?</p>
        </div>
      </div>
    }

    return page;
  }
}
