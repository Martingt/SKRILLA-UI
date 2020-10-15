import * as React from 'react'
import '../resources/styles/CategoryList.scss'
import {fetchCategories} from '../controllers/CategoriesController.tsx'
import CategoryButton from '../components/CategoryButton';
import CategoryIcons from '../utils/CategoryIcons.js';

export default class ConsumptionList extends React.Component<any, any>  {

  constructor(props){
    super(props);
    this.state = { categories: []}
  }

  componentDidMount(){
    this.refreshCategoriesList();
  }


  addColor(category){
    for (const c in CategoryIcons){
      if (CategoryIcons[c].name == category){
        return CategoryIcons[c].color
      }
    }
    return "#C1E2F6"
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
              <CategoryButton operation={"add"} triggerCategoriesList={this.refreshCategoriesList}/>
                {this.state.categories.map((category) => {
                    i =  i + 1;
                    return (
                        <div className='category' key={i} style={{backgroundColor: this.addColor(category.name)}} id={i.toString()}>
                            <p>{category.name}</p>
                            <CategoryButton operation={"edit"} triggerCategoriesList={this.refreshCategoriesList}/>
                            <CategoryButton operation={"del"} triggerCategoriesList={this.refreshCategoriesList}/>
                        </div>
                    )
                })
            }
            </div>

  )}

}
