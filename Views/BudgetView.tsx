import * as React from "react";
import "../resources/styles/budget/budget.scss";
import BudgetCategoryList from "../components/budget/BudgetCategoryList";
import BudgetSummary from "../components/budget/BudgetSummary";
import BudgetNavigator from "../components/budget/BudgetNavigator";
import { connect } from "react-redux";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import NewBudgetForm from "../components/budget/NewBudgetForm";
import {
  fetchBudgetSummary,
  putCategoryBudget,
  fetchBudgetList,
} from "../controllers/BudgetController";
import SideBar from "../components/SideBar";

class BudgetView extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.updateCategoryBudget = this.updateCategoryBudget.bind(this);
    this.state = {
      budgetId: null,
      budgetsByCategory: [],
      budget: 0,
      totalSpent: 0,
      noBudgets: false,
      newBudgetFormActive: false,
      budgetList: [{ startDate: {}, endDate: {} }],
    };
  }

  componentDidMount() {
    if (this.props.token !== null) {
      this.initializeBudgetView();
    }
  }

  async updateCategoryBudget(categoryId, amount, force) {
    let data = {
      budgetId: this.state.budgetId,
      category: categoryId,
      amount: parseFloat(amount),
      forceRequest: force,
    };

    var status = await putCategoryBudget(data)
      .then((result) => {
        if (result.code == "success") {
          this.initializeBudgetView();
          return "success";
        } else if (result.code == "budget_overflow") {
          return "budget_overflow";
        }
      })
      .catch((error) => console.log("error", error));
    console.log(status);
    return status;
  }

  toggleNewBudgetForm = () => {
    this.setState({ newBudgetFormActive: !this.state.newBudgetFormActive });
  };

  handleNewBudgetTaskFinished = (id) => {
    fetchBudgetList()
      .then((result) => {
        this.setState({
          budgetList: result.sort(budgetComparator),
          noBudgets: false,
        });
      })
      .catch((error) => console.log("error", error));

    this.fetchAndSetBudget(id);
    this.setState({ newBudgetFormActive: !this.state.newBudgetFormActive });
  };

  handeNewBudgetCancelation = () => {
    this.toggleNewBudgetForm();
  };

  getCurrentBudget = () => {
    var today = new Date();
    var todayTime = today.getTime();
    var i = 0;
    var index = 0;
    var aux = null;
    var closeDate = new Date(
      this.state.budgetList[0].startDate.year,
      this.state.budgetList[0].startDate.month,
      this.state.budgetList[0].startDate.day,
      0,
      0,
      0,
      0
    );
    console.log(this.state.budgetList[0]);

    while (i < this.state.budgetList.length) {
      aux = new Date(
        this.state.budgetList[i].year,
        this.state.budgetList[i].month,
        this.state.budgetList[i].day,
        0,
        0,
        0,
        0
      );

      if (
        todayTime - aux.getTime() <= todayTime - closeDate.getTime() &&
        todayTime - aux.getTime() >= 0
      ) {
        closeDate = aux;
        index = i;
      }
      console.log("ttime:" + todayTime);
      console.log("ctime:" + closeDate.getTime());
      i = i + 1;
    }

    return this.state.budgetList[index];
  };

  fetchAndSetBudget = (budgetId) => {
    fetchBudgetSummary(budgetId)
      .then((result) => {
        this.setState({
          budgetId: result.budgetId,
          budget: result.amount,
          totalSpent: result.totalSpent,
          budgetsByCategory: result.categoryItems,
        });
      })
      .catch((error) => console.log("error", error));
  };

  initializeBudgetView = () => {
    fetchBudgetList()
      .then((result) => {
        console.log(result);
        if (result.code == "no_content") {
          this.setState({ noBudgets: true });
          return;
        }
        this.setState({
          budgetList: result.sort(budgetComparator),
          noBudgets: false,
        });
        this.fetchAndSetBudget(this.getCurrentBudget().budgetId);
      })
      .catch((error) => console.log("error", error));
  };

  render() {
    return (
      <div id="content">
        <div className="mainContainer">
          <SideBar />
          <div className="mainContainerContent">
            <div className="budgetToolbar">
              <h1 className="containerTopBarTitle">Presupuesto</h1>
              {!this.state.noBudgets ? (
                <BudgetNavigator
                  budgets={this.state.budgetList}
                  onChange={this.fetchAndSetBudget}
                />
              ) : null}
              <div className="budgetToolbarContainer">
                <div
                  className="createBudgetButton"
                  onClick={this.toggleNewBudgetForm}
                >
                  <p style={{ color: "white" }}>Nuevo Presupuesto</p>
                </div>
              </div>
            </div>
            {this.state.noBudgets ? (
              <div className="noBudgetsWarning">
                No tienes presupuestos aun.
              </div>
            ) : (
              <div>
                <div className="budgetSubtitle">Resumen</div>
                <BudgetSummary
                  budget={this.state.budget}
                  spent={this.state.totalSpent}
                />
                <div className="budgetSubtitle">Presupuesto por categoria</div>
                <BudgetCategoryList
                  className="budgetCategoryList"
                  budgetItems={this.state.budgetsByCategory}
                  updateCategoryBudget={this.updateCategoryBudget}
                />
              </div>
            )}
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
            <NewBudgetForm
              onCreationOk={this.handleNewBudgetTaskFinished}
              onCancel={this.handeNewBudgetCancelation}
            />
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

function budgetComparator(a, b) {
  let dateA = new Date(
    a.startDate.year,
    a.startDate.month,
    a.startDate.day,
    0,
    0,
    0,
    0
  );
  let dateB = new Date(
    b.startDate.year,
    b.startDate.month,
    b.startDate.day,
    0,
    0,
    0,
    0
  );
  if (dateA < dateB) {
    return -1;
  } else if (dateA > dateB) {
    return 1;
  } else {
    return 0;
  }
}
