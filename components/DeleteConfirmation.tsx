import * as React from 'react'
import '../resources/styles/addConsumptionForm.scss'
import {TextField, Select, InputLabel, FormControl, Button} from '@material-ui/core';
import AuthService  from '../utils/AuthService.tsx';
import IconButton from '@material-ui/core/IconButton';
import AddButton from '@material-ui/icons/Add';
import ClearButton from '@material-ui/icons/Clear';
import Categories from '../components/Categories';
import {
  postConsumption,
  fetchConsumption,
  updateConsumption
} from '../controllers/ConsumptionsController.tsx';



export default class DeleteConfirmation extends React.Component<any,any>{




  proceed = (e) => {
      this.props.onDeletionConfirmed(e);
  }

  onCancel = (e) => {
    this.setState({ title: "",amount: 0, category:"",date: null, consumption:null});
    if(this.props.onCancel !== null)
      this.props.onCancel();
  }

  toggleNewCategory = (e) => {
    this.setState({newCategory:!this.state.newCategory});
  }
  render(){
    return <div className="addContsumptionFormContainer">
        <div className="warningMessage">{this.props.message}</div>
        <div className="addConsumptionFormItem">
          <Button  color="primary" onClick={this.proceed}>Confirmar</Button>
          <Button  color="primary" onClick={this.onCancel}>Cancelar</Button>
        </div></div>;
  }
}
