
import * as React from 'react'
import '../resources/styles/sign-in.scss'
import '../resources/styles/homescreen.scss'
import AuthService from '../utils/AuthService.tsx'
import RegisterForm from '../components/RegisterForm';
import {createStore} from '@reduxjs/toolkit';
import {Provider} from 'react-redux';
import loginReducer from '../redux/LoginReducer.tsx';
import AppView from '../Views/AppView.tsx';


export default class IndexPage extends React.Component<any, any> {

  constructor(props){
    super(props);
  }

  render() {
    return <AppView />;
  }
}
