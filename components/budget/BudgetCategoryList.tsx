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
import EditIcon from '@material-ui/icons/EditOutlined';
import Button from '@material-ui/core/Button';
import '../../resources/styles/budget/budgetCategoryList.scss';

export default class BudgetCategoryList extends React.Component<any, any>  {

  constructor(props){
    super(props);
    this.state = {
      token: null,
      currentlyExpandedRow: null
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

  handleRowClick(event, rowId){
    if(this.state.currentlyExpandedRow === rowId){
      this.setState({currentlyExpandedRow: null});
    }
    else {
      this.setState({currentlyExpandedRow: rowId});
    }
  }

  getCategoryIcon(category){
    for (const c in CategoryIcons){
      if (CategoryIcons[c].name == category){
        var path = "/images/categories/" + CategoryIcons[c].path;
        return (<img src={path} alt={CategoryIcons[c].name} className="categoryIconSmall"/>)
      }
    }
  }


  render(){
    var i = 0;

  return (
        <TableContainer className={this.props.className} component={Paper}>
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
              {this.props.consumptions.map((row) => {
                  return (
                  <React.Fragment key={row.id}>
                  <TableRow  id={row.id}
                  onClick={(event)=>this.handleRowClick(event, row.id)}>
                    <TableCell style={{ borderBottom:0}} >
                      <IconButton aria-label="expand row" size="small" >
                        {this.isRowExpanded(row.id) ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                      </IconButton>
                    </TableCell>
                    <TableCell style={{ borderBottom:0}} align="left">
                      <div className="listCategoryItem">
                      {this.getCategoryIcon(row.category.iconDescriptor)}
                      <div style={{paddingLeft:'5px'}}>{row.category.name}</div>
                      </div></TableCell>
                      <TableCell style={{ borderBottom:0}} align="left">123.45</TableCell>
                      <TableCell style={{ borderBottom:0}} align="left">175</TableCell>
                      <TableCell style={{ borderBottom:0, color:"#05a025"}} align="left">35%</TableCell>
                  </TableRow>
                  <TableRow >
                    <TableCell style={{ paddingBottom: 0, paddingTop: 0}} colSpan={5}>
                    <Collapse in={this.isRowExpanded(row.id)}
                    timeout="auto" unmountOnExit>
                    </Collapse>
                    </TableCell>
                  </TableRow></React.Fragment>
                )} )}
            </TableBody>
          </Table>
        </TableContainer>);
  }

}
