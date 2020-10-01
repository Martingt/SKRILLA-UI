import * as React from 'react'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import AddButton from '@material-ui/icons/Add';

export default class ConsumptionList extends React.Component<any, any>  {

  constructor(props){
    super(props);
    this.state = { consumptions: [], token: null, category: ""}
  }

  componentDidMount(){
    this.setState({token: this.getAuthToken()});
    this.fetchConsumptions();
  }

  fetchConsumptions(category){
    var myHeaders = new Headers();
    var fetchURL = "https://localhost:5001/consumptions";

    if(category != undefined && category != ""){
        fetchURL += "?category="+category;
    }

    myHeaders.append("Authorization", "Bearer " + this.getAuthToken());

    let requestOptions: RequestInit = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch(fetchURL, requestOptions)
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

  filterByCategory = (e) => {

      this.fetchConsumptions(e.target.value);
      this.setState({category: e.target.value});
  }

  render(){
    var i = 0;

  return (<div>
      <div className="containerToolbar">
          <div className="topBarFilters">
            <TextField
              size="small"
              name="category"
              label="Busca por categoria"
              onChange={this.filterByCategory}
              className="categoryFilter"/>
          </div>
          <IconButton color="primary" onClick={this.props.onAddConsumption} >
            <AddButton />
          </IconButton>
        </div>
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
              {this.state.consumptions.map((row) => {
                i =  i + 1;
                return (
                <TableRow key={i}>
                  <TableCell align="left">{row.date.day}-{row.date.month}-{row.date.year}</TableCell>
                  <TableCell align="left">{row.title}</TableCell>
                  <TableCell align="left">{row.amount}</TableCell>
                  <TableCell align="left">{row.category.name}</TableCell>
                </TableRow>
              )} )}
            </TableBody>
          </Table>
        </TableContainer>
        </div>);
  }

}
