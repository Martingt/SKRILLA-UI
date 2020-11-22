import * as React from "react";
import "@/resources/addConsumptionForm.scss";
import { Button } from "@material-ui/core";

export default class DeleteConfirmation extends React.Component<any, any> {
  proceed = (e) => {
    this.props.onDeletionConfirmed(e);
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
        <div className="warningMessage">{this.props.message}</div>
        <div className="addConsumptionFormItem">
          <Button color="primary" onClick={this.proceed}>
            Confirmar
          </Button>
          <Button color="primary" onClick={this.onCancel}>
            Cancelar
          </Button>
        </div>
      </div>
    );
  }
}
