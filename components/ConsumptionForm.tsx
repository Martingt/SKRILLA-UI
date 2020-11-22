import * as React from "react";
import "@/resources/addConsumptionForm.scss";
import { TextField, InputLabel, FormControl, Button } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import AddButton from "@material-ui/icons/Add";
import ClearButton from "@material-ui/icons/Clear";
import Categories from "../components/Categories";
import CategoryIconsList from "../components/CategoryIconsList";
import {
  postConsumption,
  fetchConsumption,
  updateConsumption,
} from "../controllers/ConsumptionsController";

export default class ConsumptionForm extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      amount: 0,
      category: "",
      categoryIcon: "",
      date: getTodaysDate(),
      creationStatus: "empty",
      errorMessages: [],
      titleControl: { error: false, helperText: "" },
      amountControl: { error: false, helperText: "" },
      categoryControl: { error: false, helperText: "" },
      dateControl: { error: false, helperText: "" },
    };
  }

  componentDidMount() {
    if (this.props.task.operation === "edit") {
      fetchConsumption(this.props.task.consumptionId)
        .then((result) => {
          this.setState({
            title: result.title,
            amount: result.amount,
            date: formatDate(
              result.date.year,
              result.date.month,
              result.date.day
            ),
            category: result.category.name,
          });
        })
        .catch((error) => console.log("error", error));
    }
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  formIsValid() {
    var error = true;

    let payload = {
      title: this.state.title,
      amount: this.state.amount,
      category: this.state.category,
      date: this.state.date,
    };

    if (payload.title == null || payload.title == "") {
      this.setState({
        titleControl: {
          error: true,
          helperText: "Se debe especificar un titulo.",
        },
      });
      error = false;
    } else {
      this.setState({
        titleControl: {
          error: false,
          helperText: "Se debe especificar un titulo.",
        },
      });
    }

    if (payload.amount == null || isNaN(payload.amount) || payload.amount < 0) {
      this.setState({
        amountControl: {
          error: true,
          helperText: "Se debe especificar un monto numerico positivo.",
        },
      });

      error = false;
    } else {
      this.setState({
        amountControl: {
          error: false,
          helperText: "Se debe especificar un monto positivo.",
        },
      });
    }
    if (payload.date == null) {
      this.setState({
        dateControl: { error: true, helperText: "Fecha invalida." },
      });

      error = false;
    } else {
      this.setState({
        dateControl: { error: false, helperText: "Fecha invalida." },
      });
    }

    if (payload.category == null || payload.category == "") {
      this.setState({
        categoryControl: {
          error: true,
          helperText: "Se debe especificar una categoria.",
        },
      });
      error = false;
    } else {
      this.setState({
        categoryControl: {
          error: false,
          helperText: "Se debe especificar una categoria.",
        },
      });
    }

    return error;
  }

  onSubmit = (e) => {
    e.preventDefault();
    let payload = {
      title: this.state.title,
      amount: parseFloat(this.state.amount),
      category: this.state.category,
      categoryIcon: this.state.categoryIcon,
      date: this.state.date,
    };

    if (!this.formIsValid()) {
      return;
    }

    if (this.props.task.operation === "edit") {
      updateConsumption(this.props.task.consumptionId, payload).then((res) => {
        console.log(res);
        if (res.result == "error") {
          this.setState({ status: "error", errorMessages: res.messages });
        } else {
          this.props.onEditionOk();
        }
      });
    } else if (this.props.task.operation === "add") {
      postConsumption(payload).then((res) => {
        console.log(res);
        if (res.result == "error") {
          this.setState({ status: "error", errorMessages: res.messages });
        } else {
          this.props.onCreationOk();
        }
      });
    }
  };

  onCancel = () => {
    this.setState({
      title: "",
      amount: 0,
      category: "",
      date: null,
      consumption: null,
    });
    if (this.props.onCancel !== null) this.props.onCancel();
  };

  toggleNewCategory = () => {
    this.setState({ newCategory: !this.state.newCategory });
  };
  render() {
    return (
      <div className="addContsumptionFormContainer">
        <h2 id="transition-modal-title" className="addConsumptionFormTitle">
          {this.props.task.operation === "edit"
            ? "Editar consumo"
            : "Agregar consumo"}
        </h2>
        <form className="addContsumptionForm">
          <div className="addConsumptionFormItem">
            <TextField
              name="title"
              autoComplete="off"
              className="addConsumptionField"
              InputProps={{ style: { fontSize: "0.9rem" } }}
              label="Titulo"
              value={this.state.title}
              error={this.state.titleControl.error}
              helperText={this.state.titleControl.helperText}
              onChange={this.handleChange}
            />
          </div>
          <div className="addConsumptionFormItem">
            <TextField
              name="amount"
              label="Monto"
              error={this.state.amountControl.error}
              helperText={this.state.amountControl.helperText}
              value={this.state.amount}
              onChange={this.handleChange}
              className="addConsumptionInput addConsumptionAmountField"
            />
            <TextField
              id="date"
              name="date"
              label="Fecha"
              type="date"
              error={this.state.dateControl.error}
              helperText={this.state.dateControl.helperText}
              value={this.state.date}
              onChange={this.handleChange}
              InputLabelProps={{ shrink: true }}
              InputProps={{ style: { fontSize: "0.9rem", marginLeft: "10px" } }}
            />
          </div>
          <div className="addConsumptionFormItem">
            <div>
              {!this.state.newCategory ? (
                <div>
                  <FormControl className="addConsumptionFormSelect">
                    <InputLabel htmlFor="category-select">
                      Categoria:{" "}
                    </InputLabel>
                    <Categories
                      value={this.state.category}
                      onChange={this.handleChange}
                      error={this.state.categoryControl.error}
                    />
                  </FormControl>
                  <IconButton onClick={this.toggleNewCategory}>
                    <AddButton />
                  </IconButton>
                </div>
              ) : (
                <div>
                  <TextField
                    name="category"
                    autoComplete="off"
                    InputProps={{ style: { fontSize: "0.9rem" } }}
                    label="Nueva categoria"
                    value={this.state.category}
                    error={this.state.categoryControl.error}
                    helperText={this.state.categoryControl.helperText}
                    onChange={this.handleChange}
                  />
                  <FormControl className="addConsumptionFormSelect">
                    <InputLabel htmlFor="category-icon-select">
                      Icono de categoria:{" "}
                    </InputLabel>
                    <CategoryIconsList
                      value={this.state.categoryIcon}
                      onChange={this.handleChange}
                      error={this.state.categoryControl.error}
                    />
                  </FormControl>

                  <IconButton color="primary" onClick={this.toggleNewCategory}>
                    <ClearButton />
                  </IconButton>
                </div>
              )}
            </div>
          </div>
          {this.state.status === "error" ? (
            <div className="consumptionCreationErrors">
              {this.state.errorMessages.map((err) => {
                return <div>{err}</div>;
              })}
            </div>
          ) : null}
          <div className="addConsumptionFormItem">
            <Button color="primary" onClick={this.onSubmit}>
              {this.props.task.operation === "edit" ? "Guardar" : "Agregar"}
            </Button>
            <Button color="primary" onClick={this.onCancel}>
              Cancelar
            </Button>
          </div>
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

function formatDate(year, month, day) {
  var dd = String(day).padStart(2, "0");
  var mm = String(month).padStart(2, "0");
  var yyyy = year;
  var format_today = yyyy + "-" + mm + "-" + dd;
  return format_today;
}
