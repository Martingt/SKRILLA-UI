import * as React from 'react'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';
import CategoryIcons from '../../utils/CategoryIcons.js';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/DeleteOutlined';
import DoneIcon from '@material-ui/icons/Done';
import EditIcon from '@material-ui/icons/EditOutlined';
import Button from '@material-ui/core/Button';
import TextField from "@material-ui/core/TextField";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import '../../resources/styles/budget/budgetCategoryList.scss';

export default class BudgetCategoryList extends React.Component<any, any>  {

  constructor(props){
    super(props);
    this.state = {
      token: null,
      currentlyExpandedRow: null,
      rowCurrentlyInEdition: null,
      budgetOnEditionValue:"",
      operationModalVisible: false,
      operationData: {}
    }
  }

  componentDidMount(){
    this.setState({token: this.getAuthToken()});
  }


  getAuthToken(){
    let token = null;
    if (document.cookie.split(';').some((item) => item.trim().startsWith('token='))) {
      token = document.cookie
        .split("; ")
        .find(row => row.startsWith("token"))
        .split("=")[1];
      }
    return token;
  }

  isRowExpanded(rowId){
    return this.state.currentlyExpandedRow === rowId;
  }

  isRowInEdition(rowId){
    return this.state.rowCurrentlyInEdition === rowId;
  }

  handleRowClick(event, rowId, amount){
    console.log(event.target)
      if(!event.target.matches(".editBudgetOnTable, .editBudgetOnTable *")){
        this.setState({rowCurrentlyInEdition: rowId,
          budgetOnEditionValue: (amount == -1)? "" : amount});
      }

  }

  handleExpandClick(event, rowId){
    if(this.state.currentlyExpandedRow === rowId){
      this.setState({currentlyExpandedRow: null});
    }
    else {
      this.setState({currentlyExpandedRow: rowId});
    }
  }

  getBudgetedAmountCell(rowId, amount){
    let cellContent = null;
    if(this.isRowInEdition(rowId)){
      cellContent = <div className="editBudgetOnTable">
        <TextField
           size="small"
           onChange={this.handleCategoryBudgetUpdate}
          value={this.state.budgetOnEditionValue}
          label={(amount == -1)? "monto":null} />
          <IconButton  className="finishBudgetEditionOnTable" aria-label="expand row" size="small"
              onClick={this.finishBudgetEditionOnTable}>
            <DoneIcon />
          </IconButton>
      </div>
    }
    else {
      cellContent = (amount == -1)? "-": "$ "+amount;
    }

    return cellContent;
  }
  getCategoryIcon(category){
    for (const c in CategoryIcons){
      if (CategoryIcons[c].name == category){
        var path = "/images/categories/" + CategoryIcons[c].path;
        return (<img src={path} alt={CategoryIcons[c].name} className="categoryIconSmall"/>)
      }
    }
  }

  handleCategoryBudgetUpdate = (e) =>{
    this.setState({budgetOnEditionValue: e.target.value})
  }

  handleUpdateCancelation = () => {
    this.setState({operationModalVisible:false,
      operationData:null,
      rowCurrentlyInEdition:null,
      budgetOnEditionValue:""});
  }

  handleUpdateRetry = () => {
    this.setState({operationModalVisible:false,
      operationData:null});
  }


  calculateProportion(spent, budget){
    return (budget == -1 || budget==0)? "-": Math.round(spent/budget*100)+"%"
  }

  getProportionColor(spent, budget){
    return (spent/budget > 1 && budget!=0)? "red":"#05a025"
  }

  forceBudgetUpdate = () => {
      this.finishBudgetEditionOnTable(null, true);
      this.setState({operationModalVisible:false,
        operationData:null,
        rowCurrentlyInEdition:null,
        budgetOnEditionValue:""});
    
  }

  finishBudgetEditionOnTable = (event, forced) => {
    if(event!=null){
      event.preventDefault();
    }
    if(forced == null){
      forced = false;
    }

    let data = {id: this.state.rowCurrentlyInEdition,
      budget: this.state.budgetOnEditionValue}


    this.props.updateCategoryBudget(data.id, data.budget, forced).then(result =>
    {
      console.log("hola");
      console.log(result);

      if(result == "success"){
        this.setState({rowCurrentlyInEdition:null, budgetOnEditionValue:""});
      }
      else if (result == "budget_overflow") {
        this.setState({operationModalVisible:true, operationData: data });
      }
    });



  }
  render(){


  return (<div className={this.props.className}>
        <TableContainer  component={Paper}>
          <Table  size="small" aria-label="simple table">
            <TableHead>
              <TableRow>
              <TableCell align="left"></TableCell>
                <TableCell align="left">
                  <span className="columnName">Categoria</span>
                </TableCell>
                <TableCell align="left">
                <span className="columnName">Gasto actual</span></TableCell>
                <TableCell align="left">
                <span className="columnName">Presupuesto</span></TableCell>
                <TableCell align="left">
                <span className="columnName">Porcentaje gastado</span></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.props.budgetItems.map((row) => {
                  return (
                  <React.Fragment key={row.category.categoryId}>
                  <TableRow  id={row.category.categoryId}
                      onClick={(event)=>this.handleRowClick(event, row.category.categoryId, row.budgetedAmount)}>
                    <TableCell style={{ borderBottom:0, maxWidth:"50px"}} >
                      <IconButton  aria-label="expand row" size="small"
                          onClick={(event)=>this.handleExpandClick(event, row.category.categoryId)}
                      >
                        {this.isRowExpanded(row.category.categoryId) ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                      </IconButton>
                    </TableCell>
                    <TableCell style={{ borderBottom:0}} align="left">
                      <div className="listCategoryItem">
                      {this.getCategoryIcon(row.category.iconDescriptor)}
                      <div style={{paddingLeft:'5px'}}>{row.category.name}</div>
                      </div></TableCell>
                      <TableCell style={{ borderBottom:0}} align="left">{"$ "+row.totalSpent}</TableCell>
                      <TableCell style={{ borderBottom:0}} align="left">{
                        this.getBudgetedAmountCell(row.category.categoryId, row.budgetedAmount)
                      }</TableCell>
                      <TableCell
                        style={{ borderBottom:0,
                        color: this.getProportionColor(row.totalSpent, row.budgetedAmount)}}
                      align="left">
                      {this.calculateProportion(row.totalSpent, row.budgetedAmount)}</TableCell>
                  </TableRow>
                  <TableRow >
                    <TableCell style={{ paddingBottom: 0, paddingTop: 0}} colSpan={5}>
                    <Collapse in={this.isRowExpanded(row.category.categoryId)}
                    timeout="auto" unmountOnExit>
                    </Collapse>
                    </TableCell>
                  </TableRow></React.Fragment>
                )} )}
            </TableBody>
          </Table>
        </TableContainer>
        <Modal
          aria-labelledby="Presupuesto superado"
          open={this.state.operationModalVisible}
          onClose={this.handleUpdateCancelation}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{ timeout: 500 }}
          className="confirmUpdateModal"
        >
          <Fade in={this.state.operationModalVisible}>
            <div className="confirmUpdateModalContent">
            <h2>Prespuesto total superado</h2>
            <p className="modalInnerParagraph">Aumentar el presupuesto en el monto indicado para esta categoria implica superar el presupuesto total.</p>
            <p className="modalInnerParagraph">Desea ingresar un monto nuevamente o actualizar el presupuesto total?</p>
            <div className="modalOptions">
            <Button
              className="newBudgetButton"
              color="primary"
              variant="outlined"
              onClick={this.handleUpdateRetry}
              disableElevation
              size="medium"
            >
              Ingresar nuevamente
            </Button>
            <Button
              variant="outlined"
              className="newBudgetButton"
              color="primary"
              onClick={this.forceBudgetUpdate}
              size="medium"
              disableElevation
            >
              Actualizar presupuesto
            </Button>
            </div>
            </div>
          </Fade>
        </Modal></div>);
  }

}
