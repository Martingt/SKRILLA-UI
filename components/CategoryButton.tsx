import * as React from 'react'
import '../resources/styles/category.scss'
import Button from 'react-bootstrap/Button';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import CategoryForm from './CategoryForm';
import DeleteConfirmation from './DeleteConfirmation';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/DeleteOutlined';
import EditIcon from '@material-ui/icons/EditOutlined';
import AddIcon from '@material-ui/icons/Add';

export default class CategoryButton extends React.Component<any, any>  {

    constructor(props){
        super(props);
        this.state = {
          consumptions: [],
          categoryItemTask:false,
          task: null
        }
    }


    deleteCategory = (id) => {
        let task = {operation: "del", id:id}
        this.setState({
          task:task,
          categoryItemTask: true})
      }

      deleteCategoryFromTask = () => {
        if(this.state.task !== null && this.state.task.operation === "del"){
        deleteCategory(this.state.task.id)
          .then(result => {
            let newConsumptions = this.state.consumptions;
            let index = newConsumptions.findIndex(c => c.id === this.state.task.id)
            newConsumptions.splice(index,1)
            this.setState({consumptions: newConsumptions,
              task:null,
              consumptionItemTask: false});
          })
          .catch(error => console.log('error', error));
     
        }
      }

    handleAddCategory = () =>  {
        var task = { operation:"add" }
        this.setState({
          task: task,
          categoryItemTask: !this.state.categoryItemTask
        });
      }

      handleEditCategory = () =>  {
        var task = { operation:"edit" }
        this.setState({
          task: task,
          categoryItemTask: !this.state.categoryItemTask
        });
      }

      handleCategoryTaskCanceled = () => {
        this.setState({
            categoryItemTask: !this.state.categoryItemTask,
         task: null
         });
      }

      handleCategoryTaskFinished = () => {
        this.props.triggerCategoriesList;
        this.setState({
         consumptionItemTask: !this.state.consumptionItemTask,
         task: null
       });
     }

     toggleOperation = () => {
         let operation = this.props.operation;
         if(operation == 'add')
            this.handleAddCategory();
        else if(operation == 'edit')
            this.handleEditCategory();
      };

  render(){
    return(
        <div>
        <IconButton onClick={()=> this.toggleOperation()} aria-label="expand row" size="small" >
          {
            (this.props.operation == 'add') ?
              <AddIcon/>:
              (this.props.operation == 'edit') ?
                <EditIcon/>:
                  <DeleteIcon/>
          }
        </IconButton>
       
        {(this.state.task !== null &&
                  (this.state.task.operation == "add" ||
                   this.state.task.operation == "edit"))?
                  <Modal
                    aria-labelledby="Crear categoria"
                    open={this.state.categoryItemTask}
                    onClose={this.handleCategoryTaskCanceled}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    className="addContsumptionModal"
                    BackdropProps={{ timeout: 500 }}>
                  <Fade in={this.state.categoryItemTask}>
                  <CategoryForm
                    task={this.state.task}
                    onEditionOk={this.handleCategoryTaskFinished}
                    onCreationOk={this.handleCategoryTaskFinished}
                    onCancel={this.handleCategoryTaskCanceled}/>
                    </Fade>
                    </Modal>:
                    (this.state.task !== null && this.state.task.operation == "del")?
                    <Modal
                      aria-labelledby="Borrar Consumo"
                      open={this.state.categoryItemTask}
                      onClose={this.handleCategoryTaskCanceled}
                      closeAfterTransition
                      BackdropComponent={Backdrop}
                      className="addContsumptionModal"
                      BackdropProps={{ timeout: 500 }}>
                    <Fade in={this.state.categoryItemTask}>
                    <DeleteConfirmation
                      message="¿Seguro que desea eliminar la categoria?"
                      onDeletionConfirmed={this.deleteCategoryFromTask}
                      onCancel={this.handleCategoryTaskCanceled}/>
                      </Fade>
                      </Modal>:null
                  }
        </div>
        
      
    )}
}
