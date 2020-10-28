import * as React from "react";
import "../resources/styles/sign-in.scss";
import "../resources/styles/homescreen.scss";
import AuthService from "../utils/AuthService.tsx";
import TopBar from "../components/TopBar";
import SideBar from "../components/SideBar";
import CategoriesList from "../components/CategoriesList";
import CategoryPieChart from "../components/CategoryPieChart";
import TotalPerMonthBar from "../components/TotalPerMonthBar";
import { connect } from "react-redux";
import consumptions from "pages/consumptions";

const authService = new AuthService();

class CategoryView extends React.Component<any, any> {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="content">
        <TopBar />
        <div className="mainContainer">
          <SideBar />
          <div className="mainContainerContent">
            <h1 className="containerTopBarTitle">Categorias</h1>

            <div className="dashboard">
              <div
                style={{ display: "flex", flex: 1, justifyContent: "center" }}
              >
                <CategoryPieChart />
              </div>
              <div
                style={{ display: "flex", flex: 1, justifyContent: "center" }}
              >
                <TotalPerMonthBar />
              </div>
            </div>

            <div
              style={{
                display: "inline-block",
                flex: 1,
                justifyContent: "center",
                fontSize: 10,
              }}
            >
              <CategoriesList />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.token,
});

export default connect(mapStateToProps, null)(CategoryView);
