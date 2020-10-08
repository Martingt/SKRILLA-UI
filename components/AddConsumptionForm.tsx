import * as React from 'react'
import '../resources/styles/addConsumptionForm.scss'
import {TextField, Select, InputLabel, FormControl, Button} from '@material-ui/core';
import AuthService  from '../utils/AuthService.tsx';
import IconButton from '@material-ui/core/IconButton';
import AddButton from '@material-ui/icons/Add';
import ClearButton from '@material-ui/icons/Clear';
import Categories from '../components/Categories';
import {postConsumption} from '../controllers/ConsumptionsController.tsx';


export default class AddConsumptionForm extends React.Component<any,any>{
  constructor(props){
    super(props);
    this.state = {
      title: "",
      amount: null,
      category:"",
      date: getTodaysDate(),
      creationStatus:"empty",
      errorMessages: [],
      titleControl: {error: false, helperText: ""},
      amountControl: {error: false, helperText: ""},
      categoryControl: {error: false, helperText: ""},
      dateControl: {error: false, helperText: ""}
    }
  }
  handleChange = (e) =>{
      this.setState({[e.target.name]: e.target.value});
  }

  formIsValid() {
    var error = true;

    let payload = {
       title: this.state.title,
       amount: this.state.amount,
       category: this.state.category,
       date: this.state.date
    };

    if (payload.title == null || payload.title == ""){
      this.setState({
          titleControl: {error: true, helperText: "Se debe especificar un titulo."}
      });
      error = false;
    }
    else {
      this.setState({
          titleControl: {error: false, helperText: "Se debe especificar un titulo."}
      });
    }

    if (payload.amount == null || isNaN(payload.amount) || payload.amount < 0){
      this.setState({
          amountControl: {error: true, helperText: "Se debe especificar un monto numerico positivo."}
      });

      error = false;
    }
    else {
      this.setState({
          amountControl: {error: false, helperText: "Se debe especificar un monto positivo."}
      });
    }
    if (payload.date == null ){
      this.setState({
          dateControl: {error: true, helperText: "Fecha invalida."}
      });

      error = false;
    }
    else {
      this.setState({
          dateControl: {error: false, helperText: "Fecha invalida."}
      });
    }

    if (payload.category == null || payload.category == ""){
      this.setState({
          categoryControl: {error: true, helperText: "Se debe especificar una categoria."}
        });
      error = false;
    }
    else {
      this.setState({
          categoryControl: {error: false, helperText: "Se debe especificar una categoria."}
        });
    }

    return error;
  }

  onSubmit = (e) => {
      e.preventDefault();
      var error = false;
      let errorMessages = this.state.errorMessages;

      let payload = {
         title: this.state.title,
         amount: parseFloat(this.state.amount),
         category: this.state.category,
         date: this.state.date
      };

      if(!this.formIsValid()){return;}
      let result = postConsumption(payload).then(res => {
        console.log(res);
        if(res.result == "error"){
          this.setState({status: "error", errorMessages: res.messages});
        }
        else {
            this.props.onCreationOk();
        }
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
          error={this.state.titleControl.error}
          helperText={this.state.titleControl.helperText}
          onChange={this.handleChange}/>
        </div>
        <div className="addConsumptionFormItem">
          <TextField
            name="amount"
            label="Monto"
            error={this.state.amountControl.error}
            helperText={this.state.amountControl.helperText}
            onChange={this.handleChange}
            className="addConsumptionInput addConsumptionAmountField"/>
          <TextField
              id="date"
              name="date"
              label="Fecha"
              type="date"
              error={this.state.dateControl.error}
              helperText={this.state.dateControl.helperText}
              defaultValue={getTodaysDate()}
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
              <Categories
                onChange={this.handleChange}
                error={this.state.categoryControl.error} />
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
                error={this.state.categoryControl.error}
                helperText={this.state.categoryControl.helperText}
                onChange={this.handleChange}/>
            <IconButton color="primary" onClick={this.toggleNewCategory} >
              <ClearButton />
            </IconButton></div>}
            </div>
        </div>
        {(this.state.status === "error")?
        <div className="consumptionCreationErrors">
            {this.state.errorMessages.map(err => {
              return <div>{err}</div>
            })}
        </div>:null}
        <div className="addConsumptionFormItem">
          <Button  color="primary" onClick={this.onSubmit}>Agregar</Button>
          <Button  color="primary" onClick={this.onCancel}>Cancelar</Button>
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
