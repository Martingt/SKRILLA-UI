import * as React from "react";
import "@/resources/sign-in.scss";
import "@/resources/homescreen.scss";
import AuthService from "../utils/AuthService";
import StartupView from "../Views/StartupView";
import CategoryView from "../Views/CategoryView";
import { connect } from "react-redux";
import loginAction from "../redux/LoginAction";
const authService = new AuthService();

class AppView extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      token: null,
      viewPage: 1,
    };
  }

  componentDidMount() {
    this.props.login(authService.getToken());
  }

  render() {
    let page = null;
    if (this.props.token !== null) {
      page = <CategoryView />;
    } else {
      page = <StartupView />;
    }

    return page;
  }
}

const mapStateToProps = (state) => ({
  token: state.token,
});

const mapDispatchToProps = (dispatch) => ({
  login: (token) => dispatch(loginAction(token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AppView);
