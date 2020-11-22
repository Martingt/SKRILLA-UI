import * as React from "react";
import "@/resources/sign-in.scss";
import "@/resources/homescreen.scss";
import RegisterForm from "../components/RegisterForm";
import LoginForm from "../components/LoginForm";

export default class StartupView extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      currentForm: "login",
    };
  }

  handleFormChange = (form) => {
    this.setState({ currentForm: form });
  };

  render() {
    let page = null;

    if (this.state.currentForm === "login") {
      page = <LoginForm onFormChange={this.handleFormChange} />;
    } else if (this.state.currentForm === "signUp") {
      page = <RegisterForm onFormChange={this.handleFormChange} />;
    } else {
      return "Estado invalido. Cierre esta ventana.";
    }

    return (
      <div className="loginBody">
        <div className="logo">
          <img src="/images/skrilla-logo-large.png"></img>
        </div>
        <div className="login">{page}</div>
      </div>
    );
  }
}
