import * as React from 'react'
import '../resources/styles/styles.scss'
import AuthService from '../utils/AuthService'

const auth = new AuthService()

export default class Register extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
          value: "",
          token:null,
          name: "",
          password:"",
          confirmPassword:""
        };

         this.handleChange = this.handleChange.bind(this);
         this.handleSubmit = this.handleSubmit.bind(this);
      }

      handleChange(e) {
        this.setState({[e.target.name]: e.target.value});
      }

      handleSubmit (e) {
        e.preventDefault();
        auth.signUp(this.state.email, this.state.password, this.state.confirmPassword)
          .then(res => {
            if (res != undefined) {
                this.setState({token: res});
                this.props.handleToUpdate(this.state.token);
            }
            else
              this.setState({error: 1})
            console.log(res);

          })
          .catch(e => console.log(e))
      }


    render() {
        let page =
        <div className="login">
            <form onSubmit={
                this.handleSubmit} >
                <label className="form-cont" >
                    <p className="text-cont">Email</p>
                    <input className="signIn" type="text" name="email"
                    onChange={this.handleChange}></input>
                </label>
                <label className="form-cont">
                    <p className="text-cont">Password</p>
                    <input className="signIn"  type="password" name="password"
                    onChange={this.handleChange}></input>
                </label>
                <label className="form-cont">
                    <p className="text-cont">Confirm Password</p>
                    <input className="signIn"  type="password" name="confirmPassword"
                    onChange={this.handleChange}></input>
                </label>
                <label className="subm-cont">
                    <input className="signIn" type="submit" value="Sign Up" ></input>
                </label>
            </form>
        </div>

        return page;

    }

}
