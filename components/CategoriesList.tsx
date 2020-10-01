import * as React from 'react'
import '../resources/styles/CategoryList.scss'
export default class ConsumptionList extends React.Component<any, any>  {

  constructor(props){
    super(props);
    this.state = { categories: [], token: null}
  }

  componentDidMount(){
    this.setState({token: this.getAuthToken()});
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
  newColor(){
    var randomColor = Math.floor(Math.random()*16777215).toString(16);
    return '#'+randomColor.toString();
  }

  render(){
    var i = 0;

  return (
        <div>
            <h2 className='title'>Categorias</h2>
            <div className='container'>
                
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
        </div>
        
  )}

}
