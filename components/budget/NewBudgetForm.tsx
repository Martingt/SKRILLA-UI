import * as React from "react";
import { connect } from "react-redux";
import "../../resources/styles/budget/budgetForm.scss";
import {
  TextField,
  Select,
  InputLabel,
  FormControl,
  Button,
} from "@material-ui/core";
import { postBudget } from "../../controllers/BudgetController";

class NewBudgetForm extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      errorMessages: [],
      startDate: getTodaysDate(),
      endDate: getTodaysDate(),
      budget: 0,
      budgetControl: { error: false, helperText: "" },
      startDateControl: { error: false, helperText: "" },
      endDateControl: { error: false, helperText: "" },
    };
  }
  handleFormSubmit = (e) => {
    e.preventDefault();
  };

  onCancel = (e) => {
    this.props.onCancel();
  };

  handleChange = (e) => {
    console.log(e.target.name);
    console.log(e.target.value);
    this.setState({ [e.target.name]: e.target.value });
  };

  formIsValid() {
    var error = true;

    let payload = {
      startDate: this.state.startDate,
      endDate: this.state.endDate,
      budget: this.state.budget,
    };

    if (payload.budget == null || isNaN(payload.budget) || payload.budget < 0) {
      this.setState({
        budgetControl: {
          error: true,
          helperText: "Se debe especificar un presupuesto numerico positivo.",
        },
      });

      error = false;
    } else {
      this.setState({
        budgetControl: {
          error: false,
          helperText: "Se debe especificar un presupuesto positivo.",
        },
      });
    }
    if (payload.startDate == null) {
      this.setState({
        startDateControl: { error: true, helperText: "Fecha invalida." },
      });

      error = false;
    } else {
      this.setState({
        startDateControl: { error: false, helperText: "Fecha invalida." },
      });
    }

    if (payload.endDate == null) {
      this.setState({
        endDateControl: { error: true, helperText: "Fecha invalida." },
      });

      error = false;
    } else {
      this.setState({
        endDateControl: { error: false, helperText: "Fecha invalida." },
      });
    }
    return error;
  }

  onSubmit = (e) => {
    e.preventDefault();
    var error = false;
    let errorMessages = this.state.errorMessages;
    let payload = {
      startDate: this.state.startDate,
      endDate: this.state.endDate,
      amount: parseFloat(this.state.budget),
    };

    if (!this.formIsValid()) {
      return;
    }

    postBudget(payload).then((res) => {
      console.log(res);
      if (res.result == "error") {
        this.setState({ status: "error", errorMessages: res.messages });
      } else {
        this.props.onCreationOk();
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
            error={this.state.startDateControl.error}
            helperText={this.state.startDateControl.helperText}
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
            error={this.state.endDateControl.error}
            helperText={this.state.endDateControl.helperText}
            value={this.state.endDate}
            onChange={this.handleChange}
            InputLabelProps={{ shrink: true }}
            InputProps={{ style: { fontSize: "0.9rem", marginLeft: "10px" } }}
          />
          <TextField
            name="budget"
            label="Presupuesto"
            error={this.state.budgetControl.error}
            helperText={this.state.budgetControl.helperText}
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
