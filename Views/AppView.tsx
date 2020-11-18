
import * as React from 'react'
import '../resources/styles/sign-in.scss'
import '../resources/styles/homescreen.scss'
import AuthService from '../utils/AuthService.tsx'
import RegisterForm from '../components/RegisterForm';
import ConsumptionView from '../Views/ConsumptionView.tsx';
import StartupView from '../Views/StartupView.tsx';
import CategoryView from '../Views/CategoryView.tsx';
import { connect } from 'react-redux';
import loginReducer from '../redux/LoginReducer.tsx';
import loginAction from  '../redux/LoginAction.tsx';
const authService = new AuthService()

class AppView extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      token:null,
      viewPage: 1
    };
  }

  componentDidMount(){
    this.props.login(authService.getToken());
  }


  render() {

    let page = null;
    if(this.props.token !== null){
        page = <CategoryView  />
    }
    else {
          page = <StartupView  />
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

export default connect(mapStateToProps, mapDispatchToProps)(AppView)
