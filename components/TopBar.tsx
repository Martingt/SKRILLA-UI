import * as React from "react";

import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import "../resources/styles/topBar.scss";
import { logoutAction } from "../redux/LoginAction.tsx";
import { connect } from "react-redux";
import Link from "next/link";
import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";

class TopBar extends React.Component<any, any> {
  constructor(props) {
    super(props);
  }

  logout() {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    this.props.logout();
  }
  handleItemClick = (param) => {
    this.setState({ sideBarOpen: !this.state.sideBarOpen });
    this.props.onChangePage(param);
  };
  render() {
    var i = 0;

    return (
      <div>
        <div className="containerTopBar">
          <div className="topBarLeft">
            <img src="/images/skrilla-icon.png" className="skrillaTopBarLogo" />
          </div>
          <div className="logout">
            <input onClick={() => this.logout()} type="submit" value="Logout" />
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  logout: () => dispatch(logoutAction()),
});

export default connect(null, mapDispatchToProps)(TopBar);
