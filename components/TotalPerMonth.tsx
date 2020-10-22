import * as React from 'react';
import '../resources/styles/sign-in.scss';
import '../resources/styles/homescreen.scss';
import AuthService from '../utils/AuthService.tsx';
import {XYPlot, VerticalBarSeries, HorizontalGridLines, VerticalGridLines, XAxis, YAxis, Hint} from 'react-vis';


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
        data.push({x: new Date(consumption.year,consumption.month-1), y: consumption.amount})
      })
    data.sort(function(a,b){
        return new Date(a.x) - new Date(b.x);
    });
    data.map((cons) => {
      cons.x = cons.x.getMonth()+1+"/"+cons.x.getFullYear()
    })
    return data
  }

  render(){
    return  <div id="content">
        <div style={{display:"flex", flex:1,justifyContent:"center", fontSize: 10}}>
        <XYPlot
            width={300}
            height={350}
            xType="ordinal"
            >
            <XAxis/>
            <YAxis/>
            <HorizontalGridLines />
            <VerticalGridLines />
            <VerticalBarSeries
                data={this.createDataChart()}
                onNearestX={(event)=>{
                  
                }}
            />
        </XYPlot>
 
        </div>
        </div>
  }
}
