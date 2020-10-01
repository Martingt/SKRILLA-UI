import * as React from 'react'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import CategoryIcons from '../utils/CategoryIcons.js';


export default class ConsumptionList extends React.Component<any, any>  {

  constructor(props){
    super(props);
    this.state = {  token: null}
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

  getCategoryIcon(category){
    console.log(CategoryIcons);
    for (const c in CategoryIcons){

      if (CategoryIcons[c].name == category){
        var path = "/images/categories/" + CategoryIcons[c].path;
        return (
        <div className="listCategoryItem">
          <img src={path} alt={CategoryIcons[c].name} className="categoryIconSmall"/>
          <div style={{paddingLeft:'5px'}}>{category}</div>
        </div>)
      }
    }
    return category;
  }

  render(){
    var i = 0;

  return (
        <TableContainer component={Paper}>
          <Table  aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Fecha</TableCell>
                <TableCell align="left">Titulo</TableCell>
                <TableCell align="left">Monto</TableCell>
                <TableCell align="left">Categoria</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.props.consumptions.map((row) => {
                  i =  i + 1;
                  return (
                  <TableRow key={i}>
                    <TableCell align="left">{row.date.day}-{row.date.month}-{row.date.year}</TableCell>
                    <TableCell align="left">{row.title}</TableCell>
                    <TableCell align="left">{row.amount}</TableCell>
                    <TableCell align="left">{this.getCategoryIcon(row.category.name)}</TableCell>
                  </TableRow>
                )} )}
            </TableBody>
          </Table>
        </TableContainer>);
  }

}
