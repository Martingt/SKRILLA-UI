import * as React from "react";
import "@/resources/sign-in.scss";
import "@/resources/homescreen.scss";
import SideBar from "../components/SideBar";
import CategoriesList from "../components/CategoriesList";
import CategoryPieChart from "../components/CategoryPieChart";
import TotalPerMonthBar from "../components/TotalPerMonthBar";
import BudgetPieChart from "../components/BudgetBar";
import { connect } from "react-redux";

class CategoryView extends React.Component<any, any> {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="content">
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
            <div className="dashboard">
              <div
                style={{ display: "flex", flex: 1, justifyContent: "center" }}
              >
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
              <div
                style={{ display: "flex", flex: 1, justifyContent: "center" }}
              >
                <BudgetPieChart />
              </div>
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
