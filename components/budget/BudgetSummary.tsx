import * as React from "react";
import { connect } from "react-redux";
import "../@/resources/budget/BudgetSummary.scss";

class BudgetSummary extends React.Component<any, any> {
  render() {
    let porcentage = 0;
    let p_style = "#15c045";

    if (this.props.budget > 0) {
      porcentage = Math.round((this.props.spent / this.props.budget) * 100);
    }
    if (this.props.spent > this.props.budget) {
      p_style = "red";
    }

    return (
      <div className="budgetSummary">
        <div className="budgetSummaryItem">
          <div className="budgetSummaryItemValue">$ {this.props.budget}</div>
          <div className="budgetSummaryItemLabel">
            Presupuesto para este periodo
          </div>
        </div>
        <div className="budgetSummaryItem">
          <div className="budgetSummaryItemValue">$ {this.props.spent}</div>
          <div className="budgetSummaryItemLabel">Gasto actual total</div>
        </div>
        <div className="budgetSummaryItem">
          <div className="budgetSummaryItemValue">
            $ {this.props.budget - this.props.spent}
          </div>
          <div className="budgetSummaryItemLabel">Dinero disponible</div>
        </div>
        <div className="budgetSummaryItem">
          <div
            className="budgetSummaryItemValue porcentageValue"
            style={{ color: p_style }}
          >
            {porcentage}%
          </div>
          <div className="budgetSummaryItemLabel">Porcentaje gastado</div>
        </div>
      </div>
    );
  }
}

export default connect(null, null)(BudgetSummary);
