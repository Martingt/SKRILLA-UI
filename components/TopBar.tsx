import * as React from 'react'

import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import '../resources/styles/topBar.scss'
import {slide as Menu} from 'react-burger-menu';
import {logoutAction} from  '../redux/LoginAction.tsx';
import { connect } from 'react-redux'

class TopBar extends React.Component<any, any>  {

  constructor(props) {
    super(props);
  }

  logout(){
     document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
     this.props.logout();
  }
  handleItemClick = (param) => {
    this.setState({sideBarOpen: !this.state.sideBarOpen});
    this.props.onChangePage(param);
  }
  render(){
    var i = 0;

  return (<div>
      <div className="containerTopBar">
        <Menu>
          <a onClick={()=> this.props.onChangePage(1)} className="barMenuItem">Consumos</a>
          <a onClick={()=> this.props.onChangePage(2)} className="barMenuItem">Categorias</a>
        </Menu>
        <div className="topBarLeft">
          <img src="/images/skrilla-icon.png" className="skrillaTopBarLogo"/>
        </div>
        <div className="logout">
          <input onClick= {() => this.logout()} type="submit" value="Logout"/>
        </div>
    </div></div>);
  }
}


const mapDispatchToProps = (dispatch, ownProps) => ({
  logout: () => dispatch(logoutAction())
})

export default connect(null,mapDispatchToProps)(TopBar);
