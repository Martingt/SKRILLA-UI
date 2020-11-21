import * as React from "react";
import { connect } from "react-redux";
import "../Styles/budget/budgetForm.scss";
import { TextField, Button } from "@material-ui/core";
import { postBudget } from "../../controllers/BudgetController";

class NewBudgetForm extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      errorMessages: [],
      startDate: getTodaysDate(),
      endDate: getTodaysDate(),
      budget: 0,
    };
  }

  onCancel = () => {
    this.props.onCancel();
  };

  handleChange = (e) => {
    console.log(e.target.name);
    console.log(e.target.value);
    this.setState({ [e.target.name]: e.target.value });
  };

  handleFormSubmit = () => {};

  formIsValid() {
    var valid = true;

    let payload = {
      status: "ok",
      startDate: this.state.startDate,
      endDate: this.state.endDate,
      budget: this.state.budget,
    };

    if (payload.budget == null || isNaN(payload.budget) || payload.budget < 0) {
      this.addErrorMessage(
        "Se debe especificar un presupuesto numerico positivo."
      );
      valid = false;
    } else {
      this.removeErrorMessage(
        "Se debe especificar un presupuesto numerico positivo."
      );
    }

    if (payload.startDate == null) {
      this.addErrorMessage("Se debe especificar una fecha de comienzo.");
      valid = false;
    } else {
      this.removeErrorMessage("Se debe especificar una fecha de comienzo.");
    }

    if (payload.startDate == null) {
      this.addErrorMessage("Se debe especificar una fecha de finalizacion.");
      valid = false;
    } else {
      this.removeErrorMessage("Se debe especificar una fecha de finalizacion.");
    }
    if (!valid) {
      this.setState({ status: "error" });
    }
    return valid;
  }

  addErrorMessage = (message) => {
    let index = this.state.errorMessages.indexOf(message);
    let errors = this.state.errorMessages;
    if (index == -1) {
      errors.push(message);
    }
    this.setState({ errorMessages: errors });
  };

  removeErrorMessage = (message) => {
    let index = this.state.errorMessages.indexOf(message);
    if (index != -1) {
      this.state.errorMessages.splice(index, 1);
    }
    this.setState({ errorMessages: this.state.errorMessages });
  };

  onSubmit = (e) => {
    e.preventDefault();

    if (!this.formIsValid()) {
      return;
    }

    let payload = {
      startDate: this.state.startDate,
      endDate: this.state.endDate,
      amount: parseFloat(this.state.budget),
      budgetItems: [],
    };

    this.setState({ errorMessages: [] });

    postBudget(payload).then((res) => {
      console.log(res);
      if (res.result == "error") {
        this.setState({ status: "error", errorMessages: res.messages });
      } else if (res.code == "conflict") {
        this.addErrorMessage(res.message);
        this.setState({ status: "error" });
      } else {
        this.props.onCreationOk(res.BudgetId);
      }
    });
  };

  render() {
    return (
      <div className="budgetFormContainer">
        <h2 id="transition-modal-title">Nuevo Presupuesto</h2>
        <form className="budgetCreationForm" onSubmit={this.handleFormSubmit}>
          <TextField
            id="date"
            name="startDate"
            label="Fecha de comienzo"
            type="date"
            value={this.state.startDate}
            onChange={this.handleChange}
            InputLabelProps={{ shrink: true }}
            InputProps={{ style: { fontSize: "0.9rem", marginLeft: "10px" } }}
          />
          <TextField
            id="date"
            name="endDate"
            label="Fecha de finalizacion"
            type="date"
            value={this.state.endDate}
            onChange={this.handleChange}
            InputLabelProps={{ shrink: true }}
            InputProps={{ style: { fontSize: "0.9rem", marginLeft: "10px" } }}
          />
          <TextField
            name="budget"
            label="Presupuesto"
            value={this.state.budget}
            onChange={this.handleChange}
            className="addConsumptionInput addConsumptionAmountField"
          />
          <div className="newBudgetButtonDiv">
            <div className="newBudgetButton">
              <Button
                className="newBudgetButton"
                color="primary"
                onClick={this.onCancel}
              >
                Cancelar
              </Button>
            </div>
            <div className="newBudgetButton">
              <Button
                color="primary"
                onClick={this.onSubmit}
                className="newBudgetButton"
              >
                Crear
              </Button>
            </div>
          </div>
          {this.state.status === "error" ? (
            <div className="consumptionCreationErrors">
              {this.state.errorMessages.map((err) => {
                return <div>{err}</div>;
              })}
            </div>
          ) : null}
        </form>
      </div>
    );
  }
}
function getTodaysDate() {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear();

  var format_today = yyyy + "-" + mm + "-" + dd;
  return format_today;
}
export default connect(null, null)(NewBudgetForm);
