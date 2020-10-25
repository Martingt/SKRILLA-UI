import * as React from "react";
import "../resources/styles/topBar.scss";
import Link from "next/link";
import { ProSidebar, SidebarHeader, SidebarContent } from "react-pro-sidebar";

export default class SideBar extends React.Component<any, any> {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ProSidebar>
        <SidebarHeader>
          <div className="sidebarheader">Skrilla</div>
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
