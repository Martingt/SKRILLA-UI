import * as React from 'react'
import '../resources/styles/addConsumptionForm.scss'
import {TextField, Select, InputLabel, FormControl, Button} from '@material-ui/core';
import AuthService  from '../utils/AuthService';
import IconButton from '@material-ui/core/IconButton';
import AddButton from '@material-ui/icons/Add';
import ClearButton from '@material-ui/icons/Clear';

export default class AddConsumptionForm extends React.Component<any,any>{
  constructor(props){
    super(props);
    this.state = {
      title: "",
      amount: 0,
      category:"",
      date: null,
      creationStatus:"empty",
      errorMessages: []
    }
  }
  handleChange = (e) =>{
      this.setState({[e.target.name]: e.target.value});
  }

  onSubmit = (e) => {
      e.preventDefault();
      let errorMessages = this.state.errorMessages;

      let payload = {
         title: this.state.title,
         amount: this.state.amount,
         category: this.state.category,
         date: this.state.date
      };

      /*if (payload.title == null || payload.title == ""){
        errorMessages.push("Se debe especificar un titulo no vacio. ");

        this.setState({
          creationStatus:"error",
          errorMessages: errorMessages
        });
        return;
      }

      if (isNaN(payload.amount) || payload.amount < 0){
        errorMessages.push("Se debe especificar un costo numerico. ");
        this.setState({
          creationStatus:"error",
          errorMessage: errorMessages
        });
        return;
      }*/


      let result = postConsumption(payload).then(res => {
        this.setState({creationStatus: "created"});
      });
  }

  onCancel = (e) => {
    this.setState({ title: "",amount: 0, category:"",date: null});
    if(this.props.onCancel !== null)
      this.props.onCancel();
  }

  toggleNewCategory = (e) => {
    this.setState({newCategory:!this.state.newCategory});
  }
  render(){
    return <div className="addContsumptionFormContainer">
      <h2 id="transition-modal-title" className="addConsumptionFormTitle">Agregar consumo</h2>
      <form className="addContsumptionForm">
        <div className="addConsumptionFormItem">
          <TextField name="title" autoComplete="off"
          className="addConsumptionField"
          InputProps= {{ style: { fontSize:"0.9rem"}}}
          label="Titulo"
          onChange={this.handleChange}/>
        </div>
        <div className="addConsumptionFormItem">
          <TextField name="amount" label="Costo" className="addConsumptionInput addConsumptionAmountField"/>
          <TextField
              id="date"
              name="date"
              label="Fecha"
              type="date"
              defaultValue="2020-05-24"
              onChange={this.handleChange}
              InputLabelProps={{shrink: true}}
              InputProps= {{ style: { fontSize:"0.9rem", marginLeft:'10px'} }}
            />
        </div>
        <div className="addConsumptionFormItem"><div>
          {(!this.state.newCategory)?
              <div>
              <FormControl className="addConsumptionFormSelect">
              <InputLabel htmlFor="category-select">Categoria: </InputLabel>
              <Select
                native
                value={this.state.age}
                onChange={this.handleChange}
                name="category"
                className="addConsumptionInput"
                inputProps={{
                  name: 'category',
                  id: 'category-select',
                  style: { fontSize:"0.9rem"}
                }}>
                <option value={10}></option>
                <option value={10}>Ten</option>
                <option value={20}>holahola</option>
                <option value={30}>Thirty</option>
                </Select>
            </FormControl>
            <IconButton  onClick={this.toggleNewCategory} >
              <AddButton />
            </IconButton>
            </div>
            : <div>
              <TextField name="category"
                autoComplete="off"
                InputProps= {{ style: { fontSize:"0.9rem"}}}
                label="Nueva categoria"
                onChange={this.handleChange}/>
            <IconButton color="primary" onClick={this.toggleNewCategory} >
              <ClearButton />
            </IconButton></div>}
            </div>
        </div>
        <div className="addConsumptionFormItem">
          <Button  color="primary" onClick={this.onSubmit}>Agregar</Button>
          <Button  color="primary" onClick={this.onCancel}>Cancelar</Button>
        </div>
      </form>
    </div>;
  }
}

async function postConsumption(data) {
    let token = (new AuthService).getToken();

    const response = await fetch("https://localhost:5001/consumptions", {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        'Authentication': 'Bearer' + token
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(data)
    });
    return response.json();
}
