import * as React from "react";
import "../resources/styles/styles.scss";
import AuthService from "../utils/AuthService.tsx";
import { connect } from "react-redux";
import { TextField } from "@material-ui/core";
import loginAction from "../redux/LoginAction.tsx";

const auth = new AuthService();

class Register extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      token: null,
      name: "",
      password: "",
      confirmPassword: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    auth
      .signUp(this.state.email, this.state.password, this.state.confirmPassword)
      .then((res) => {
        if (res != undefined) {
          this.props.onLogin(res);
        } else this.setState({ error: 1 });
        console.log(res);
      })
      .catch((e) => console.log(e));
  }

  cancelSignUp = () => {
    this.props.onFormChange("login");
  };

  render() {
    return (
      <form className="leftPanelForm" onSubmit={this.handleSubmit}>
        <div className="form-cont">
          <p className="text-cont">Email</p>
          <TextField
            className="signIn"
            name="email"
            onChange={this.handleChange}
          />
        </div>
        <div className="form-cont">
          <p className="text-cont">Password</p>
          <TextField
            className="signIn"
            type="password"
            name="password"
            onChange={this.handleChange}
          />
        </div>
        <div className="form-cont">
          <p className="text-cont">Confirm Password</p>
          <TextField
            className="signIn"
            type="password"
            name="confirmPassword"
            onChange={this.handleChange}
          />
        </div>
        <div className="subm-cont">
          <input className="signIn" type="submit" value="Sign Up" />
          <div className="signUpOption" onClick={this.cancelSignUp}>
            Cancel
          </div>
        </div>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  onLogin: (token) => dispatch(loginAction(token)),
});

export default connect(null, mapDispatchToProps)(Register);
