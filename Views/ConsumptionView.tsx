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

class ConsumptionView extends React.Component<any, any>  {
  constructor(props){
    super(props);
    this.state = {
      consumptions: [],
      consumptionItemCreation:false,
    }
  }

  componentDidMount(){
    if(this.props.token !== null){
      fetchConsumptions()
      .then(result => { this.setState({...this.state, consumptions: result }); })
      .catch(error => console.log('error', error));
    }
  }

  handleAddConsumption = () => {
   this.setState({ consumptionItemCreation: !this.state.consumptionItemCreation});
 };

  handleConsumptionCreation = (e) =>{
    fetchConsumptions()
      .then(result => { this.setState({...this.state, consumptions: result }); })
      .catch(error => console.log('error', error));
    this.handleAddConsumption();
  }

  filterByCategory = (e) => {
      fetchConsumptions(e.target.value)
      .then(result => { this.setState({...this.state, consumptions: result }); })
      .catch(error => console.log('error', error));
      this.setState({category: e.target.value});
  }

  render(){
    return <div id="content">
        <TopBar />
        <div className="mainContainer">
          <div className="mainContainerContent">

            <h1 className="containerTopBarTitle">Consumos</h1>
            <div className="containerToolbar">
                <div className="topBarFilters">
                  <TextField
                    size="small"
                    name="category"
                    label="Busca por categoria"
                    onChange={this.filterByCategory}
                    className="categoryFilter"/>
                </div>
                <IconButton color="primary" onClick={this.handleAddConsumption} >
                  <AddButton />
                </IconButton>
              </div>
            <ConsumptionList consumptions={this.state.consumptions} />
            <Modal
              aria-labelledby="Agregar Consumo"
              open={this.state.consumptionItemCreation}
              onClose={this.handleAddConsumption}
              closeAfterTransition
              BackdropComponent={Backdrop}
              className="addContsumptionModal"
              BackdropProps={{ timeout: 500 }}>
              <Fade in={this.state.consumptionItemCreation}>
                <AddConsumptionForm onCreationOk={this.handleConsumptionCreation} onCancel={this.handleAddConsumption}/>
              </Fade>
            </Modal>
          </div>
        </div>
      </div>
  }
}

const mapStateToProps = state => ({
  token: state.token
})

export default connect(mapStateToProps, null)(ConsumptionView)
