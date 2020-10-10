import * as React from 'react'
import '../resources/styles/CategoryList.scss'
import {fetchCategories} from '../controllers/CategoriesController.tsx'
export default class ConsumptionList extends React.Component<any, any>  {

  constructor(props){
    super(props);
    this.state = { categories: []}
  }

  componentDidMount(){
    fetchCategories()
    .then(result => { this.setState({...this.state, categories: result }); })
    .catch(error => console.log('error', error));;
  }


  newColor(){
    var red = Math.floor(((Math.random()*1000)%100)+140).toString(16);
    var green = Math.floor(((Math.random()*1000)%100)+140).toString(16);
    var blue = Math.floor(((Math.random()*1000)%100)+140).toString(16);
    return '#'+red+green+blue;
  }

  render(){
    var i = 0;

  return (
            <div className='categoriesList'>

                {this.state.categories.map((category) => {
                    i =  i + 1;
                    var color = this.newColor();
                    return (
                        <div className='category' key={i} style={{backgroundColor: this.newColor()}} id={i.toString()}>
                            <p>{category.name}</p>
                        </div>
                    )
                })
            }
            </div>

  )}

}
