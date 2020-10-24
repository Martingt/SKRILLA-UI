
import * as React from 'react'
import '../resources/styles/sign-in.scss'
import '../resources/styles/homescreen.scss'
import AuthService from '../utils/AuthService.tsx'
import BudgetView from '../Views/BudgetView.tsx';
import { connect } from 'react-redux';
import loginReducer from '../redux/LoginReducer.tsx';
import loginAction from  '../redux/LoginAction.tsx';
import {withRouter} from 'next/router';
const authService = new AuthService()

class BudgetPage extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      token:null,
      viewPage: 1
    };
  }

  componentDidMount(){
    this.props.login(authService.getToken());
    if(authService.getToken() === null){
      this.props.router.push("/");
    }
  }

  componentDidUpdate(){
    if(authService.getToken() === null){
      this.props.router.push("/");
    }
  }

  render() {

    let page = null;

    if(this.props.token !== null){
        page = <BudgetView   />
    }

    return page;
  }
}

const mapStateToProps = (state) => ({
  token: state.token
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  login: (token) => dispatch(loginAction(token))
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(BudgetPage))
