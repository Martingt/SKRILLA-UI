import * as React from 'react'
import {Select} from '@material-ui/core';
import '../resources/styles/category.scss'
import {fetchCategories} from '../controllers/CategoriesController.tsx'

export default class Categories extends React.Component<any, any>  {

  constructor(props){
    super(props);
    this.state = { categories: [] }
  }

  componentDidMount(){
    fetchCategories()
    .then(result => { this.setState({categories: result }); })
    .catch(error => console.log('error', error));
  }

  render(){
    var i = 0;
    return(
        <Select
            native
            value={this.props.value}
            name="category"
            onChange={this.props.onChange}
            inputProps={{
            name: 'category',
            id: 'category-select'
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
