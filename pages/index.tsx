
import * as React from 'react'
import '../resources/styles/styles.scss'
import AuthService from '../utils/AuthService'
import { Redirect } from "react-router-dom";

const auth = new AuthService('http://localhost:6001/connect')

export default class Login extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      token:null,
      error:0,
      data: [{id:null, title:null, amount:null, personId:0}]
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  componentDidMount () {
    this.setState({token: this.getAuthToken()});
  }
  handleChange(e) {
    this.setState({value: e.target.value});
  }
  handleSubmit (e) {
    e.preventDefault();
    auth.login(this.refs.email.value, this.refs.password.value)
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

  fetchConsumptions(){
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + this.state.token);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch("https://localhost:5001/consumptions", requestOptions)
      .then(response => response.json())
      .then(result => { this.setState({...this.state, data: result }); })
      .catch(error => console.log('error', error));
  }

  render() {
    let error = (this.state.error == 1)? <p className="forg-pass">Wrong username or password</p>:null;
    let page = null;
    if(this.state.token !== null){
      this.fetchConsumptions();
      page = <div className="mainContainer">
        <div className="mainContainerContent">
        <h1 className="containerTitle">Consumos</h1>
        <hr />
        <div className="consumption">
          <span className="consumptionItem">{this.state.data[0].id}</span>
          <span className="consumptionItem">{this.state.data[0].title}</span>
          <span className="consumptionItem">{this.state.data[0].amount}</span>
        </div>
        </div>
      </div>
    }
    else
    {
      page = <div className="loginBody">
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
            {error}
            <p className="forg-pass">Forgot your password?</p>
        </div>
      </div>
    }

    return page;
  }
}
