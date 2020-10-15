import * as React from 'react'
import '../resources/styles/CategoryList.scss'
import {fetchCategories} from '../controllers/CategoriesController.tsx'
import CategoryButton from '../components/CategoryButton';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/DeleteOutlined';
import EditIcon from '@material-ui/icons/EditOutlined';

export default class ConsumptionList extends React.Component<any, any>  {

  constructor(props){
    super(props);
    this.state = { categories: []}
  }

  componentDidMount(){
    this.refreshCategoriesList();
  }


  newColor(){
    var red = Math.floor(((Math.random()*1000)%100)+140).toString(16);
    var green = Math.floor(((Math.random()*1000)%100)+140).toString(16);
    var blue = Math.floor(((Math.random()*1000)%100)+140).toString(16);
    return '#'+red+green+blue;
  }

  refreshCategoriesList() {
    fetchCategories()
    .then(result => { this.setState({...this.state, categories: result }); })
    .catch(error => console.log('error', error));;
  }

  render(){
    var i = 0;

  return (
            <div className='categoriesList'>
              <CategoryButton operation={"add"} triggerCategoriesList={this.refreshCategoriesList()}/>
                {this.state.categories.map((category) => {
                    i =  i + 1;
                    var color = this.newColor();
                    return (
                        <div className='category' key={i} style={{backgroundColor: this.newColor()}} id={i.toString()}>
                            <p>{category.name}</p>
                            <CategoryButton operation={"edit"} triggerCategoriesList={this.refreshCategoriesList()}/>
                            <CategoryButton operation={"del"} triggerCategoriesList={this.refreshCategoriesList()}/>
                        </div>
                    )
                })
            }
            </div>

  )}

}
