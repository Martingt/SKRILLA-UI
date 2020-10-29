import * as React from 'react';
import { connect } from 'react-redux';
import '../../resources/styles/budget/budgetForm.scss';
import {TextField, Select, InputLabel, FormControl, Button} from '@material-ui/core';

class NewBudgetForm extends React.Component<any, any>  {

  constructor(props){
    super(props);
    this.state = {
      startDate: getTodaysDate(),
      endDate: getTodaysDate()
    }
  }
  handleFormSubmit = (e) => {
      e.preventDefault();
  }

  onCancel = (e) =>{
    this.props.onCancel();
  }

  render(){
    return <div className="budgetFormContainer">
      <h2 id="transition-modal-title" >Nuevo Presupuesto</h2>
      <form className="budgetCreationForm" onSubmit={this.handleFormSubmit}>
      <TextField
          id="date"
          name="date"
          label="Fecha de comienzo"
          type="date"
          value={this.state.startDate}
          onChange={this.handleChange}
          InputLabelProps={{shrink: true}}
          InputProps= {{ style: { fontSize:"0.9rem", marginLeft:'10px'} }}
        />
        <TextField
            id="date"
            name="date"
            label="Fecha de finalizacion"
            type="date"
            value={this.state.endDate}
            onChange={this.handleChange}
            InputLabelProps={{shrink: true}}
            InputProps= {{ style: { fontSize:"0.9rem", marginLeft:'10px'} }}
          />
          <div className="newBudgetButtonDiv">
          <div className="newBudgetButton"><Button
            className="newBudgetButton"
            color="primary"
            onClick={this.onCancel}>Cancelar</Button></div>
          <div className="newBudgetButton"><Button
            color="primary"
            onClick={null}
            className="newBudgetButton">Crear</Button></div>
          </div>
      </form>
    </div>;
  }
}
function getTodaysDate(){
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();

  var format_today = yyyy + '-' + mm + '-' + dd;
  return format_today;
}
export default connect(null, null)(NewBudgetForm)
