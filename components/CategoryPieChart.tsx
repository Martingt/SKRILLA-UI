import * as React from 'react';
import '../resources/styles/sign-in.scss';
import '../resources/styles/homescreen.scss';
import AuthService from '../utils/AuthService.tsx';
import {RadialChart} from 'react-vis';


const authService = new AuthService();

export default class CategoryPieChart extends React.Component<any, any>  {
  constructor(props) {
    super(props);
    this.state = {
      conspercat: [],
      month: 10,
      year: 2020
    };
    this.handleChange = this.handleChange.bind(this);
  }

  createDataChart(month,year){
    var data =[];
    var myHeaders = new Headers();
    var fetchURL = "https://localhost:5001/conspercat";

    if(month != '' && year != ''){
      fetchURL += "?month="+month+"&year="+year;
    }
    myHeaders.append("Authorization", "Bearer " + authService.getToken());

    let requestOptions: RequestInit = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    var data = [];
    fetch(fetchURL, requestOptions)
      .then(response => response.json())
      .then(result => this.setState({conspercat: result}))

    if(this.state.conspercat.length!=0){
      this.state.conspercat.map((consumption) => {
        data.push({label: consumption.category, angle: consumption.amount})
      })
    }else{
      data.push({label: "No hay consumos",angle:1})
    }
    

    return data
  }
  handleChange(event) {
    if(event.target.value<=12){
      this.setState({month: event.target.value});
    }
    else{
      this.setState({year: event.target.value});
    }
    
  }

  render(){
    return  <div id="content">
        <div>
        <select value={this.state.month} onChange={this.handleChange}>
              <option value={1} >Enero</option>
              <option value={2}>Febrero</option>
              <option value={3}>Marzo</option>
              <option value={4}>Abril</option>
              <option value={5}>Mayo</option>
              <option value={6}>Junio</option>
              <option value={7}>Julio</option>
              <option value={8}>Agosto</option>
              <option value={9}>Septiembre</option>
              <option value={10}>Octubre</option>
              <option value={11}>Noviembre</option>
              <option value={12}>Diciembre</option>
            </select>
        </div>
        <div>
        <select value={this.state.year} onChange={this.handleChange}>
              <option value={2020} >2020</option>
              <option value={2019}>2019</option>
              <option value={2018}>2018</option>
              <option value={2017}>2017</option>
            </select>
        </div>
        <div style={{display:"flex", flex:1,justifyContent:"center", fontSize: 10}}>
           
          <RadialChart
             data={this.createDataChart(this.state.month,this.state.year)}
             width={250}
             height={250}
             showLabels={true}
             />
        </div>
        </div>
  }
}