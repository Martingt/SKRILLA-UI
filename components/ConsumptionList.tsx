

import * as React from 'react'
import '../resources/styles/styles.scss'
import AuthService from '../utils/AuthService'
import { Redirect } from "react-router-dom";

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


export default class ConsumptionList extends React.Component<any, any>  {

  constructor(props){
    super(props);
    this.state = { consumptions: [], token: null}
  }

  componentDidMount(){
    this.setState({token: this.getAuthToken()})
    this.fetchConsumptions();
  }

  fetchConsumptions(){
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + this.getAuthToken());

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch("https://localhost:5001/consumptions", requestOptions)
      .then(response => response.json())
      .then(result => { this.setState({...this.state, consumptions: result }); })
      .catch(error => console.log('error', error));
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


  render(){

  return (
        <TableContainer component={Paper}>
          <Table  aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Fecha</TableCell>
                <TableCell align="left">Titulo</TableCell>
                <TableCell align="left">Costo</TableCell>
                <TableCell align="left">Categoria</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.consumptions.map((row) => (
                <TableRow key={row.id}>
                  <TableCell align="left">{row.date.day}-{row.date.month}-{row.date.year}</TableCell>
                  <TableCell align="left">{row.title}</TableCell>
                  <TableCell align="left">{row.amount}</TableCell>
                  <TableCell align="left">{row.category}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>);
  }

}
