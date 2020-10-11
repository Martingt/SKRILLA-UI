import * as React from 'react';
import '../resources/styles/sign-in.scss';
import '../resources/styles/homescreen.scss';
import AuthService from '../utils/AuthService.tsx';
import ConsumptionList from '../components/ConsumptionList';
import IconButton from '@material-ui/core/IconButton';
import AddButton from '@material-ui/icons/Add';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import AddConsumptionForm from '../components/AddConsumptionForm';
import RegisterForm from '../components/RegisterForm';
import TopBar from '../components/TopBar';
import TextField from '@material-ui/core/TextField';
import CategoriesList from '../components/CategoriesList';
import {fetchConsumptions} from '../controllers/ConsumptionsController.tsx'
import {RadialChart} from 'react-vis';
import { connect } from 'react-redux'
const authService = new AuthService();

class CategoryView extends React.Component<any, any>  {

  createDataChart(){
    const data = [{angle:12}]
    /*this.state.consumptions.map((consumption) => {
      data.push({angle: consumption.amount})
    })*/
    return data;
  }

  render(){
    return  <div id="content">
      <TopBar  />
      <div className="mainContainer">
        <div className="mainContainerContent">

          <h1 className="containerTopBarTitle">Categorias</h1>
         <CategoriesList/>
         <div style={{display:"flex", flex:1,justifyContent:"center"}}>
          <RadialChart
             data={this.createDataChart()}
             width={300}
             height={300} /></div>
        </div>
      </div>
    </div>
  }
}

const mapStateToProps = state => ({
  token: state.token
})

export default connect(mapStateToProps, null)(CategoryView)
