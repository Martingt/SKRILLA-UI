import * as React from 'react';
import '../resources/styles/sign-in.scss';
import '../resources/styles/homescreen.scss';
import AuthService from '../utils/AuthService.tsx';
import RegisterForm from '../components/RegisterForm';
import TopBar from '../components/TopBar';
import TextField from '@material-ui/core/TextField';
import loginAction from  '../redux/LoginAction.tsx';
import { connect } from 'react-redux';

const authService = new AuthService();

class StartupView extends React.Component<any, any>  {
  constructor(props){
    super(props);
    this.state = {
        error:0,
        currentView: "login",
        username: "",
        password: ""
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    authService.login(this.state.email, this.state.password)
      .then(res => {
        if (res != undefined){
          this.props.onLogin(res);
        }
        else
          this.setState({error: 1})

      })
      .catch(e => console.log(e))
  }

  handleRegisterClick = (e) => {
    e.preventDefault();
    this.setState({onRegister: true});
  }

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value});
  }

  render(){
    let error = (this.state.error == 1)? <p className="forg-pass">Wrong username or password</p>:null;
    if(this.state.currentView === "login"){
      return <div className="loginBody">
        <div className="logo">
          <img src="/images/skrilla-logo-large.png"></img>
        </div>
        <div className="login">
            <form onSubmit={this.handleSubmit} >
                <label className="form-cont" >
                    <p className="text-cont">Email</p>
                    <input className="signIn" type="text" name="email"
                    onChange={this.handleChange} ></input>
                </label>
                <label className="form-cont">
                    <p className="text-cont">Password</p>
                    <input className="signIn"  type="password" name="password"
                    onChange={this.handleChange}></input>
                </label>
                <label className="subm-cont">
                    <input className="signIn" type="submit" value="Log In" ></input>
                    <input  className="signIn" type="submit" value="Sign Up" onClick={this.handleRegisterClick}></input>
                </label>
            </form>
            {error}
            <p className="forg-pass">Forgot your password?</p>
        </div>
      </div>;
    }
    else if (this.state.currentView === "signUp"){
      return <RegisterForm handleToUpdate = {this.handleToUpdate.bind(this)} />
    }
    else {
      return "Estado invalido. Cierre esta ventana."
    }
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  onLogin: (token) => dispatch(loginAction(token))
})

export default connect(null,mapDispatchToProps)(StartupView);
