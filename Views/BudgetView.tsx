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
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import NewBudgetForm from "../components/budget/NewBudgetForm.tsx"
import consumptions from "pages/consumptions";
import {
  fetchBudget,
  fetchBudgetSummary,
  putCategoryBudget
} from "../controllers/BudgetController.tsx";
import {
  fetchCategories
} from "../controllers/CategoriesController.tsx";
import SideBar from "../components/SideBar";

const authService = new AuthService();

class BudgetView extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      budgetsByCategory: [],
      budget: 0,
      totalSpent: 0,
      newBudgetFormActive: false
    };
  }

  componentDidMount() {
    if (this.props.token !== null) {
      this.fetchBudgetSummary();
    }
  }

  fetchBudgetSummary = () => {
    fetchBudgetSummary().then((result) => {
      this.setState({ ...this.state,
        budget: result.amount,
        totalSpent: result.totalSpent,
        budgetsByCategory: result.categoryItems });
    })
    .catch((error) => console.log("error", error));
  }

  updateCategoryBudget =(categoryId, amount) =>{
    let data = {category: categoryId, amount: parseFloat(amount)}

    putCategoryBudget(data).then((result) => {
      this.fetchBudgetSummary();
    })
    .catch((error) => console.log("error", error));
  }

  toggleNewBudgetForm = () =>{
    this.setState({newBudgetFormActive: !this.state.newBudgetFormActive});
  }

  handeNewBudgetCancelation = () => {
    this.toggleNewBudgetForm();
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
                <div className="createBudgetButton"
                onClick={this.toggleNewBudgetForm}>Nuevo Presupuesto</div>
              </div>
            </div>
            <div className="budgetSubtitle">Resumen</div>
            <BudgetSummary budget={this.state.budget} spent={this.state.totalSpent}/>
            <div className="budgetSubtitle">Presupuesto por categoria</div>
            <BudgetCategoryList
              className="budgetCategoryList"
              budgetItems={this.state.budgetsByCategory}
              updateCategoryBudget={this.updateCategoryBudget}
            />
          </div>
        </div>
        <Modal
          aria-labelledby="Nuevo Presupuesto"
          open={this.state.newBudgetFormActive}
          onClose={this.handeNewBudgetCancelation}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{ timeout: 500 }}
          className="budgetForm"
        >
          <Fade in={this.state.newBudgetFormActive}>
            <NewBudgetForm onCancel={this.handeNewBudgetCancelation} />
          </Fade>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.token,
});

export default connect(mapStateToProps, null)(BudgetView);
