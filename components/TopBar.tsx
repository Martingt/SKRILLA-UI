import * as React from 'react'

import IconButton from '@material-ui/core/IconButton';
import Drawer from '@material-ui/core/Drawer';
import MenuIcon from '@material-ui/icons/Menu';
import '../resources/styles/topBar.scss'
import {slide as Menu} from 'react-burger-menu'
export default class TopBar extends React.Component<any, any>  {

  constructor(props){
    super(props);
    this.state = { consumptions: [], token: null, displayDrawer: false}
  }

  componentDidMount(){
    this.setState({token: this.getAuthToken()})
    this.fetchConsumptions();
  }

  fetchConsumptions(){
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + this.getAuthToken());

    let requestOptions: RequestInit = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch("https://localhost:5001/consumptions", requestOptions)
      .then(response => response.json())
      .then(result => { this.setState({...this.state, consumptions: result }); })
      .catch(error => console.log('error', error));
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

  handleDrawerOpen = () => {
    this.setState({displayDrawer: !this.state.displayDrawer});
  };

  render(){
    var i = 0;

  return (
    <div>
      <div className="containerTopBar">
        <Menu outerContainerId={"content"}>
          <a>Consumos</a>
          <a>Categorias</a>
        </Menu>
        <div className="topBarLeft">
          <img src="/images/skrilla-icon.png" className="skrillaTopBarLogo"/>
        </div>
        <div className="logout">Logout</div>
    </div>
    <Drawer
          variant="persistent"
          anchor="left"
          open={this.state.displayDrawer}
        >hola
      </Drawer></div>);
  }

}
