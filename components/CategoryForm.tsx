import * as React from 'react'
import '../resources/styles/addConsumptionForm.scss'
import {TextField, Select, InputLabel, FormControl, Button} from '@material-ui/core';
import AuthService  from '../utils/AuthService.tsx';
import IconButton from '@material-ui/core/IconButton';
import AddButton from '@material-ui/icons/Add';
import ClearButton from '@material-ui/icons/Clear';
import Categories from '../components/Categories';
import {
    postCategory,
    fetchCategories,
    updateCategory,
    deleteCategory
} from '../controllers/CategoriesController.tsx';



export default class CategoryForm extends React.Component<any,any>{
  constructor(props){
    super(props);
    this.state = {
      categoryName: "",
      creationStatus:"empty",
      errorMessages: [],
      categoryNameControl: {error: false, helperText: ""},
      amountControl: {error: false, helperText: ""}
    }
  }

  componentDidMount(){
    if (this.props.task.operation === "edit"){
      fetchCategories(this.props.task.categoryId)
      .then(result => {
        this.setState({
          categoryName: result.name
        }); })
      .catch(error => console.log('error', error));
    }
  }

  handleChange = (e) =>{
      this.setState({[e.target.name]: e.target.value});
  }

  formIsValid() {
    var error = true;

    let categoryName = this.state.categoryName;

    if (categoryName == null || categoryName == ""){
      this.setState({
        categoryNameControl: {error: true, helperText: "Se debe especificar un nombre de categoria."}
      });
      error = false;
    }

    return error;
  }

  onSubmit = (e) => {
      e.preventDefault();
      var error = false;
      let errorMessages = this.state.errorMessages;


      let payload = {
        name: this.state.categoryName,
        icon: 'exampleIcon'
     };

      if(!this.formIsValid()){return;}

      if(this.props.task.operation === "edit"){
        updateCategory(this.props.task.categoryId,payload).then(res => {
          console.log(res);
          if(res.result == "error"){
            this.setState({status: "error", errorMessages: res.messages});
          }
          else {
              this.props.onEditionOk();
          }
        });
      }
      else if (this.props.task.operation === "add"){
        postCategory(payload).then(res => {
          console.log(res);
          if(res.result == "error"){
            this.setState({status: "error", errorMessages: res.messages});
          }
          else {
              this.props.onCreationOk();
          }
        });
      }
  }

  onCancel = (e) => {
    this.setState({ categoryName: ""});
    if(this.props.onCancel !== null)
      this.props.onCancel();
  }

  
  render(){
    return <div className="addContsumptionFormContainer">
      <h2 id="transition-modal-title" className="addConsumptionFormTitle">
        Agregar categoria
      </h2>
      <form className="addContsumptionForm">
        <div className="addConsumptionFormItem">
          <TextField name="categoryName" autoComplete="off"
          className="addConsumptionField"
          InputProps= {{ style: { fontSize:"0.9rem"}}}
          label="Nombre"
          value={this.state.categoryName}
          error={this.state.categoryNameControl.error}
          helperText={this.state.categoryNameControl.helperText}
          onChange={this.handleChange}/>
        </div>
        
        
        <div className="addConsumptionFormItem">
          <Button  color="primary" onClick={this.onSubmit}>{
            (this.props.task.operation === "edit")?
            "Guardar":"Crear"
          }</Button>
          <Button  color="primary" onClick={this.onCancel}>Cancelar</Button>
        </div>
      </form>
    </div>;
  }
}