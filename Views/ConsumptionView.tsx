import * as React from "react";
import "../resources/styles/sign-in.scss";
import "../resources/styles/homescreen.scss";
import ConsumptionList from "../components/ConsumptionList";
import IconButton from "@material-ui/core/IconButton";
import AddButton from "@material-ui/icons/Add";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import ConsumptionForm from "../components/ConsumptionForm";
import DeleteConfirmation from "../components/DeleteConfirmation";
import MenuItem from "@material-ui/core/MenuItem";
import {
  fetchConsumptions,
  deleteConsumption,
  fetchConsumptionsPeriod,
} from "../controllers/ConsumptionsController";
import { fetchCategories } from "../controllers/CategoriesController";
import Select from "@material-ui/core/Select";
import { connect } from "react-redux";
import SideBar from "../components/SideBar";

class ConsumptionView extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      consumptions: [],
      consumptionItemTask: false,
      categories: [],
      task: null,
      month: new Date().getMonth(),
      year: new Date().getFullYear(),
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    if (this.props.token !== null) {
      fetchConsumptions(null)
        .then((result) => {
          this.setState({ ...this.state, consumptions: result });
        })
        .catch((error) => console.log("error", error));
      fetchCategories()
        .then((result) => {
          this.setState({ ...this.state, categories: result });
        })
        .catch((error) => console.log("error", error));
    }
  }

  handleAddConsumption = () => {
    var task = { operation: "add" };
    this.setState({
      task: task,
      consumptionItemTask: !this.state.consumptionItemTask,
    });
  };

  editConsumption = (id) => {
    var task = { operation: "edit", consumptionId: id };
    this.setState({
      task: task,
      consumptionItemTask: !this.state.consumptionItemTask,
    });
  };

  handleConsumptionTaskFinished = () => {
    fetchConsumptions(null)
      .then((result) => {
        this.setState({ ...this.state, consumptions: result });
      })
      .catch((error) => console.log("error", error));

    this.setState({
      consumptionItemTask: !this.state.consumptionItemTask,
      task: null,
    });
  };

  handleConsumptionTaskCanceled = () => {
    this.setState({
      consumptionItemTask: !this.state.consumptionItemTask,
      task: null,
    });
  };
  handleChange(event) {
    console.log(event.target.name);
    event.target.name == "month"
      ? this.setState({ [event.target.name]: event.target.value }, () =>
          this.filterByDate()
        )
      : event.target.name == "year"
      ? this.setState({ [event.target.name]: event.target.value }, () =>
          this.filterByDate()
        )
      : "";
  }
  filterByCategory = (e) => {
    fetchConsumptions(e.target.value)
      .then((result) => {
        this.setState({ ...this.state, consumptions: result });
      })
      .catch((error) => console.log("error", error));
    this.setState({ category: e.target.value });
  };

  filterByDate = () => {
    var day;
    [1, 3, 5, 7, 8, 10, 12].includes(this.state.month)
      ? (day = 31)
      : [4, 6, 9, 11].includes(this.state.month)
      ? (day = 30)
      : (day = 28);
    fetchConsumptionsPeriod(
      this.state.year + "-" + this.state.month + "-01",
      this.state.year + "-" + this.state.month + "-" + day
    )
      .then((result) => {
        this.setState({ ...this.state, consumptions: result });
      })
      .catch((error) => console.log("error", error));
  };

  deleteConsumption = (id) => {
    let task = { operation: "del", id: id };
    this.setState({
      task: task,
      consumptionItemTask: true,
    });
  };

  deleteConsumptionFromTask = () => {
    if (this.state.task !== null && this.state.task.operation === "del") {
      deleteConsumption(this.state.task.id)
        .then(() => {
          let newConsumptions = this.state.consumptions;
          let index = newConsumptions.findIndex(
            (c) => c.id === this.state.task.id
          );
          newConsumptions.splice(index, 1);
          this.setState({
            consumptions: newConsumptions,
            task: null,
            consumptionItemTask: false,
          });
        })
        .catch((error) => console.log("error", error));
    }
  };

  render() {
    const month = [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ];
    const year = ["2020", "2019", "2018", "2017"];
    return (
      <div id="content">
        <div className="mainContainer">
          <SideBar />
          <div className="mainContainerContent">
            <h1 className="containerTopBarTitle">Consumos</h1>
            <div className="containerToolbar">
              <div className="topBarFilters">
                <Select
                  className="categoryFilter"
                  inputProps={{ name: "category" }}
                  onChange={this.filterByCategory}
                >
                  <MenuItem value={""}>Todas</MenuItem>
                  {this.state.categories.length > 0 ? (
                    this.state.categories.map((category) => {
                      return (
                        <MenuItem value={category.name}>
                          {category.name}
                        </MenuItem>
                      );
                    })
                  ) : (
                    <MenuItem value={""}>-</MenuItem>
                  )}
                </Select>
                <Select
                  className="monthFilter"
                  inputProps={{ name: "month" }}
                  onChange={this.handleChange}
                >
                  {month.map((month, key) => {
                    return <MenuItem value={key + 1}>{month}</MenuItem>;
                  })}
                </Select>
                <Select
                  className="yearFilter"
                  inputProps={{ name: "year" }}
                  onChange={this.handleChange}
                >
                  {year.map((year, key) => {
                    return <MenuItem value={2020 - key}>{year}</MenuItem>;
                  })}
                </Select>
                <a className="clearFilter" onClick={this.filterByCategory}>
                  {" "}
                  Clear Filters
                </a>
              </div>
              <IconButton color="primary" onClick={this.handleAddConsumption}>
                <AddButton />
              </IconButton>
            </div>
            <ConsumptionList
              className="consumptionsCategoryList"
              onConsumptionEdition={this.editConsumption}
              onConsumptionDeletion={this.deleteConsumption}
              consumptions={this.state.consumptions}
            />

            {this.state.task !== null &&
            (this.state.task.operation == "add" ||
              this.state.task.operation == "edit") ? (
              <Modal
                aria-labelledby="Agregar Consumo"
                open={this.state.consumptionItemTask}
                onClose={this.handleConsumptionTaskCanceled}
                closeAfterTransition
                BackdropComponent={Backdrop}
                className="addContsumptionModal"
                BackdropProps={{ timeout: 500 }}
              >
                <Fade in={this.state.consumptionItemTask}>
                  <ConsumptionForm
                    task={this.state.task}
                    onEditionOk={this.handleConsumptionTaskFinished}
                    onCreationOk={this.handleConsumptionTaskFinished}
                    onCancel={this.handleConsumptionTaskCanceled}
                  />
                </Fade>
              </Modal>
            ) : this.state.task !== null &&
              this.state.task.operation == "del" ? (
              <Modal
                aria-labelledby="Borrar Consumo"
                open={this.state.consumptionItemTask}
                onClose={this.handleConsumptionTaskCanceled}
                closeAfterTransition
                BackdropComponent={Backdrop}
                className="addContsumptionModal"
                BackdropProps={{ timeout: 500 }}
              >
                <Fade in={this.state.consumptionItemTask}>
                  <DeleteConfirmation
                    message="¿Seguro que desea eliminar el consumo?"
                    onDeletionConfirmed={this.deleteConsumptionFromTask}
                    onCancel={this.handleConsumptionTaskCanceled}
                  />
                </Fade>
              </Modal>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.token,
});

export default connect(mapStateToProps, null)(ConsumptionView);
