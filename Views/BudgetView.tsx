import * as React from "react";
import "../resources/styles/budget/budget.scss";
import AuthService from "../utils/AuthService.tsx";
import TopBar from "../components/TopBar";
import CategoriesList from "../components/CategoriesList";
import CategoryPieChart from "../components/CategoryPieChart";
import TotalPerMonthBar from "../components/TotalPerMonthBar";
import BudgetCategoryList from "../components/budget/BudgetCategoryList";
import BudgetSummary from "../components/budget/BudgetSummary";
import { connect } from "react-redux";
import consumptions from "pages/consumptions";
import {
  fetchConsumptions,
  deleteConsumption,
} from "../controllers/ConsumptionsController.tsx";
import SideBar from "../components/SideBar";

const authService = new AuthService();

class BudgetView extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      consumptions: [],
    };
  }

  componentDidMount() {
    if (this.props.token !== null) {
      fetchConsumptions()
        .then((result) => {
          this.setState({ ...this.state, consumptions: result });
        })
        .catch((error) => console.log("error", error));
    }
  }

  render() {
    return (
      <div id="content">
        <TopBar />
        <div className="mainContainer">
          <SideBar />
          <div className="mainContainerContent">
            <div className="budgetToolbar">
              <h1 className="containerTopBarTitle">Presupuesto</h1>
              <div className="budgetToolbarContainer">
                <div className="createBudgetButton">Nuevo Presupuesto</div>
              </div>
            </div>
            <div className="budgetSubtitle">Resumen</div>
            <BudgetSummary />
            <div className="budgetSubtitle">Presupuesto por categoria</div>
            <BudgetCategoryList
              className="budgetCategoryList"
              consumptions={this.state.consumptions}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.token,
});

export default connect(mapStateToProps, null)(BudgetView);
