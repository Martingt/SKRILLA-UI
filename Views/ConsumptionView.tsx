import * as React from "react";
import "../resources/styles/sign-in.scss";
import "../resources/styles/homescreen.scss";
import AuthService from "../utils/AuthService.tsx";
import ConsumptionList from "../components/ConsumptionList";
import IconButton from "@material-ui/core/IconButton";
import AddButton from "@material-ui/icons/Add";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import ConsumptionForm from "../components/ConsumptionForm";
import DeleteConfirmation from "../components/DeleteConfirmation";
import RegisterForm from "../components/RegisterForm";
import TopBar from "../components/TopBar";
import TextField from "@material-ui/core/TextField";
import CategoriesList from "../components/CategoriesList";
import {
  fetchConsumptions,
  deleteConsumption,
} from "../controllers/ConsumptionsController.tsx";
import { RadialChart } from "react-vis";
import { connect } from "react-redux";
import SideBar from "../components/SideBar";

const authService = new AuthService();

class ConsumptionView extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      consumptions: [],
      consumptionItemTask: false,
      task: null,
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
    fetchConsumptions()
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

  filterByCategory = (e) => {
    fetchConsumptions(e.target.value)
      .then((result) => {
        this.setState({ ...this.state, consumptions: result });
      })
      .catch((error) => console.log("error", error));
    this.setState({ category: e.target.value });
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
        .then((result) => {
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
    return (
      <div id="content">
        <TopBar />
        <div className="mainContainer">
          <SideBar />
          <div className="mainContainerContent">
            <h1 className="containerTopBarTitle">Consumos</h1>
            <div className="containerToolbar">
              <div className="topBarFilters">
                <TextField
                  size="small"
                  name="category"
                  label="Busca por categoria"
                  onChange={this.filterByCategory}
                  className="categoryFilter"
                />
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
