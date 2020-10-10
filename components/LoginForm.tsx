import * as React from 'react'
import '../resources/styles/styles.scss'
import AuthService from '../utils/AuthService.tsx'
import loginAction from  '../redux/LoginAction.tsx';
import {TextField} from '@material-ui/core';
import { connect } from 'react-redux';
const authService = new AuthService()

class LoginForm extends React.Component<any, any> {
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
        this.props.onFormChange("signUp");
      }

      handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
      }


    render() {
      let error = (this.state.error == 1)? <p className="login-error">Wrong username or password</p>:null;
        return <div><form className="leftPanelForm" onSubmit={this.handleSubmit} >
            {error}
            <div className="form-cont" >
                <p className="text-cont">Email</p>
                <TextField
                  className="signIn"
                  name="email"
                  onChange={this.handleChange} />
            </div>
            <div className="form-cont">
                <p className="text-cont">Password</p>
                <TextField
                  className="signIn"
                  type="password"
                  name="password"
                  onChange={this.handleChange} />
            </div>
            <div className="subm-cont">
                <div><input className="signIn" type="submit" value="Log In" /></div>
                <div  className="signUpOption"  onClick={this.handleRegisterClick}>Registarse</div>
                <p className="forg-pass">Forgot your password?</p>
            </div>
        </form>
        </div>;

    }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  onLogin: (token) => dispatch(loginAction(token))
})

export default connect(null,mapDispatchToProps)(LoginForm);
