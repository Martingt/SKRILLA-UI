import * as React from 'react'

import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import '../resources/styles/topBar.scss'
import {slide as Menu} from 'react-burger-menu'
export default class TopBar extends React.Component<any, any>  {


  render(){
    var i = 0;

  return (<div style={{"box-sizing":"border-box" }}>
      <div className="containerTopBar">
        <Menu outerContainerId={"content"}>
          <a>Consumos</a>
          <a>Categorias</a>
        </Menu>
        <div className="topBarLeft">
          <img src="/images/skrilla-icon.png" className="skrillaTopBarLogo"/>
        </div>
        <div className="logout">Logout</div>
    </div></div>);
  }

}
