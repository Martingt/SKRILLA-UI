import * as React from 'react'

import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import '../resources/styles/topBar.scss'
import {slide as Menu} from 'react-burger-menu'
export default class TopBar extends React.Component<any, any>  {

  constructor(props) {
    super(props);
  }

  render(){
    var i = 0;

  return (<div>
      <div className="containerTopBar">
        <Menu outerContainerId={"content"}>
          <a>Consumos</a>
          <a>Categorias</a>
        </Menu>
        <div className="topBarLeft">
          <img src="/images/skrilla-icon.png" className="skrillaTopBarLogo"/>
        </div>
        <div className="logout">
          <input onClick= {() => this.props.handleToUpdate(null)} type="submit" value="Logout"/>
        </div>
    </div></div>);
  }
  
}
