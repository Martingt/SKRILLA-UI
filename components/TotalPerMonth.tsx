import * as React from 'react';
import '../resources/styles/sign-in.scss';
import '../resources/styles/homescreen.scss';
import AuthService from '../utils/AuthService.tsx';
import {XYPlot, VerticalBarSeries, HorizontalGridLines, VerticalGridLines, XAxis, YAxis} from 'react-vis';


const authService = new AuthService();

export default class CategoryPieChart extends React.Component<any, any>  {
  constructor(props) {
    super(props);
    this.state = {
      totalpermonth: [],
    };
  }
  componentDidMount(){
      this.fetchTotal()
  }
  fetchTotal(){
    var myHeaders = new Headers();
    var fetchURL = "https://localhost:5001/consumptions/totalmonth";

    myHeaders.append("Authorization", "Bearer " + authService.getToken());

    let requestOptions: RequestInit = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    fetch(fetchURL, requestOptions)
      .then(response => response.json())
      .then(result => this.setState({totalpermonth: result}))
  }
  createDataChart(){
    var data = [];
    this.state.totalpermonth.map((consumption) => {
        data.push({x: consumption.month+'/'+consumption.year, y: consumption.amount})
        console.log(data)
      })
    return data
  }

  render(){
    return  <div id="content">
        <div style={{display:"flex", flex:1,justifyContent:"center", fontSize: 10}}>
        <XYPlot 
            width={500}
            height={500}
            xType="ordinal"
            >
            <XAxis/>
            <YAxis title="Total Gastado" />
            <HorizontalGridLines />
            <VerticalGridLines />
            <VerticalBarSeries
                data={this.createDataChart()}
            />
        </XYPlot>
          
        </div>
        </div>
  }
}