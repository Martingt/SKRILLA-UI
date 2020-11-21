import * as React from "react";
import "../Styles/budget/budgetNavigator.scss";
import BackArrow from "@material-ui/icons/ArrowBackIosRounded";
import NextArrow from "@material-ui/icons/ArrowForwardIosRounded";

class BudgetNavigator extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      currentlyShownBudget: 0,
    };
  }

  componentDidMount() {}

  handleClickPrevious = () => {
    let index = this.state.currentlyShownBudget;
    console.log(index);
    if (index > 0) {
      this.setState({ currentlyShownBudget: index - 1 });
      this.props.onChange(this.props.budgets[index - 1].budgetId);
    }
    return;
  };

  handleClickNext = () => {
    let index = this.state.currentlyShownBudget;
    console.log(index);
    if (index + 1 < this.props.budgets.length) {
      this.setState({ currentlyShownBudget: index + 1 });
      this.props.onChange(this.props.budgets[index + 1].budgetId);
    }
    return;
  };

  render() {
    let startDate = this.props.budgets[this.state.currentlyShownBudget]
      .startDate;
    let endDate = this.props.budgets[this.state.currentlyShownBudget].endDate;

    return (
      <div className="budgetNavigator">
        <div className="navLeftDiv" onClick={this.handleClickPrevious}>
          <BackArrow />
        </div>
        <div className="navContent">
          {formatDate(startDate.year, startDate.month, startDate.day)}-
          {formatDate(endDate.year, endDate.month, endDate.day)}
        </div>
        <div className="navRightDiv" onClick={this.handleClickNext}>
          <NextArrow />
        </div>
      </div>
    );
  }
}
export default BudgetNavigator;

function formatDate(year, month, day) {
  var dd = String(day).padStart(2, "0");
  var mm = String(month).padStart(2, "0");
  var yyyy = year;
  var format_today = dd + "/" + mm + "/" + yyyy;
  return format_today;
}
