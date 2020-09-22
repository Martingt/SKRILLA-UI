import * as React from 'react'
import '../resources/styles/styles.scss'
import {TextField, Select, InputLabel, FormControl, Button} from '@material-ui/core';

export default class AddConsumptionForm extends React.Component <Any,Any>{
  constructor(props){
    super(props);
    this.state = {
      title: "",
      amount: 0,
      category:"",
      date: null
    }
  }
  handleChange = (e) =>{
      this.setState({[e.target.name]: e.target.value});
  }

  render(){
    return <div className="addContsumptionFormContainer">
      <h2 id="transition-modal-title" className="addConsumptionFormTitle">Agregar consumo</h2>
      <form className="addContsumptionForm">
        <div className="addConsumptionFormItem">
          <TextField name="title" s autoComplete="off" className="addConsumptionField" label="Title"/>
        </div>
        <div className="addConsumptionFormItem">
          <TextField name="amount" label="Amount" className="addConsumptionAmountField"/>
          <FormControl className="addConsumptionFormSelect">
          <InputLabel htmlFor="category-select">Category: </InputLabel>
          <Select
            native
            value={this.state.age}
            onChange={this.handleChange}
            name="category"
            inputProps={{
              name: 'category',
              id: 'category-select'
            }}>
            <option value={10}></option>
            <option value={10}>Ten</option>
            <option value={20}>holahola</option>
            <option value={30}>Thirty</option>
            </Select></FormControl>
        </div>
        <div className="addConsumptionFormItem">
          <TextField
              id="date"
              label="Fecha"
              type="date"
              defaultValue="2017-05-24"
              InputLabelProps={{
                shrink: true,
              }}
            />
        </div>
        <div className="addConsumptionFormItem">
          <Button  color="primary">Agregar</Button>
          <Button  color="primary" onclick={this.props.onCancel}>Cancelar</Button>
        </div>
      </form>
    </div>;
  }
}
