import * as React from 'react'
import {Select} from '@material-ui/core';
import '../resources/styles/category.scss'
export default class Categories extends React.Component<any, any>  {

  constructor(props){
    super(props);
    this.state = { categories: [], token: null}
  }

  componentDidMount(){
    this.setState({token: this.getAuthToken()})
    this.fetchCategories();
  }

  fetchCategories(){
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + this.getAuthToken());
    let requestOptions: RequestInit = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch("https://localhost:5001/categories", requestOptions)
      .then(response => response.json())
      .then(result => { this.setState({...this.state, categories: result }); })
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
    var i = 0;
    return(
        <Select
            native
            value={this.state.age}
            name="category"
            onChange={this.props.onChange}
            className="categoryList"
            inputProps={{
            name: 'category',
            id: 'category-select',
            style: { fontSize:"0.9rem"}
            }}>
            {this.state.categories.map((category => {
                i=i+1;
                return(
                  <option key={i}>{category.name}</option>
                )
            }))}
        </Select>
    )}

}
