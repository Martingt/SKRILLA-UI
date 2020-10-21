import * as React from 'react';
import '../resources/styles/sign-in.scss';
import '../resources/styles/homescreen.scss';
import {getConsumptionPerCategory} from '../controllers/ConsumptionsController.tsx'
import AuthService from '../utils/AuthService';
import {RadialChart} from 'react-vis';
import { Console } from 'console';


const authService = new AuthService();

export default class CategoryPieChart extends React.Component<any, any>  {
  constructor(props) {
    super(props);
    this.state = {
      conspercat: [],
      category: [],
      month: 10,
      year: 2020
    };
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount(){
    this.fetchData();
    this.createCategory();
  }

  fetchData(){
    getConsumptionPerCategory(this.state.month,this.state.year)
      .then(result => this.setState({conspercat: result}, this.createCategory))
  }
  createCategory(){
    var data = [];
    for(const i in this.state.conspercat){
      data.push({name: this.state.conspercat[i].category, check: true})
    }
    this.setState({category: data})
  }
  createDataChart(){
    var data =[];
    if(this.state.conspercat.length!=0){
      this.state.conspercat.map((consumption) => {
        data.push({label: consumption.category, angle: consumption.amount})
      })
    }else{
      data.push({label: "No hay consumos", angle:1, color: 8})
    }
    return data
  }
  handleChange(event) {
      event.target.type === 'select-one'? this.setState({[event.target.name]: event.target.value}, ()=>this.fetchData())
      : this.deleteConspercat(event)
  }
  deleteConspercat(e){
    var conspercate = this.state.conspercat
    for(const i in conspercate){
      if (conspercate[i].category == e.target.value){
        for(const c in this.state.category){
          if(this.state.category[c].name == e.target.value){
            this.state.category[c].check = false;
          }
        }
        conspercate.splice(i,1);
        this.setState({...this.state,conspercat: conspercate})
      }
    }
  }
  render(){
    return  <div id="content">
        <div>
        <select name="month" value={this.state.month} onChange={this.handleChange}>
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
        <select name="year" value={this.state.year} onChange={this.handleChange}>
              <option value={2020}>2020</option>
              <option value={2019}>2019</option>
              <option value={2018}>2018</option>
              <option value={2017}>2017</option>
            </select>
        </div>

        <div>
          {
            this.state.category.map((category) => {
              return <div>
              <input type="checkbox" value={category.name} checked={category.check} onChange={this.handleChange}></input>
              <label>{category.name}</label>
              </div>
            })
          }
        </div>

        <div style={{display:"flex", flex:1,justifyContent:"center", fontSize: 10}}>

          <RadialChart
             data={this.createDataChart()}
             width={300}
             height={300}
             showLabels={true}
             />
        </div>
        </div>
  }
}
