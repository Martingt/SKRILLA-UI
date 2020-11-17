import * as React from 'react';
import { connect } from 'react-redux';
import '../../resources/styles/budget/budgetNavigator.scss';
import BackArrow from '@material-ui/icons/ArrowBackIosRounded';
import NextArrow from '@material-ui/icons/ArrowForwardIosRounded';

class BudgetNavigator extends React.Component<any, any>  {

  constructor(props) {
    super(props);
    this.state = {
      currentlyShownBudget: 0,
      budgets: [{id:null, startDate:{}, endDate:null}]
    }
  }

  componentDidMount() {
    var budgets = this.props.budgets;
    console.log(budgets);
    budgets = budgets.sort(budgetComparator);
    console.log("hola")
    console.log(budgets);
    this.setState({budgets:budgets, currentShown: this.props.defaultBudget});
  }

  handleClickPrevious = () => {
    let index=this.state.currentlyShownBudget;
    if (index> 0){
      this.setState({currentlyShownBudget: index-1});
      this.props.onChange(this.state.budgets[index-1]);
    }
    return;
  }

  handleClickNext = () => {
    let index=this.state.currentlyShownBudget;
    if (index+1 < this.state.budgets.length){
      this.setState({currentlyShownBudget: index+1});
      this.props.onChange(this.state.budgets[index+1]);
    }
    return;
  }


  render(){
    let startDate = this.state.budgets[this.state.currentlyShownBudget].startDate;
    let endDate = this.state.budgets[this.state.currentlyShownBudget].endDate;

    return <div className="budgetNavigator">
    <div className="navLeftDiv" onClick={this.handleClickPrevious}><BackArrow /></div>
    <div className="navContent" >
      {formatDate(startDate.year, startDate.month, startDate.day)}
      -{endDate}
    </div>
    <div className="navRightDiv" onClick={this.handleClickNext}><NextArrow /></div>
    </div>;
  }
}
export default BudgetNavigator;

function budgetComparator(a,b){
  let dateA = new Date(a.startDate.year, a.startDate.month, a.startDate.day, 0, 0,0,0);
  let dateB = new Date(b.startDate.year, b.startDate.month, b.startDate.day, 0, 0,0,0);
  if(dateA < dateB){
    return -1;
  }
  else if (dateA > dateB){
    return 1;
  }
  else {
    return 0;
  }

}

function formatDate(year, month, day) {
  var dd = String(day).padStart(2, "0");
  var mm = String(month).padStart(2, "0");
  var yyyy = year;
  var format_today = dd + "/" + mm + "/" + yyyy;
  return format_today;
}
