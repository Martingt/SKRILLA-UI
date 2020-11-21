import * as React from "react";
import "./resources/styles/topBar.scss";
import { logoutAction } from "../redux/LoginAction";
import { connect } from "react-redux";
import Link from "next/link";
import { ProSidebar, SidebarHeader, SidebarContent } from "react-pro-sidebar";

class SideBar extends React.Component<any, any> {
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
    return (
      <ProSidebar>
        <SidebarHeader>
          <div className="header">
            <div className="sidebarheader">Skrilla</div>
            <img
              className="logoutIcon"
              src="/images/logout.png"
              onClick={() => this.logout()}
            ></img>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <Link href="/">
            <a className="barMenuItem">Categorias</a>
          </Link>
          <Link href="/budget">
            <a className="barMenuItem">Presupuesto</a>
          </Link>
          <Link href="/consumptions">
            <a className="barMenuItem">Consumos</a>
          </Link>
        </SidebarContent>
      </ProSidebar>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logoutAction()),
});

export default connect(null, mapDispatchToProps)(SideBar);
