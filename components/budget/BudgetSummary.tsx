import * as React from 'react';
import { connect } from 'react-redux';
import '../../resources/styles/budget/BudgetSummary.scss';

class BudgetSummary extends React.Component<any, any>  {

  render(){
    return <div className="budgetSummary">
      <div className="budgetSummaryItem">
        <div className="budgetSummaryItemValue">$312</div>
        <div className="budgetSummaryItemLabel">
          Presupuesto para este periodo
        </div>
      </div>
      <div className="budgetSummaryItem">
        <div className="budgetSummaryItemValue">$252.3</div>
        <div className="budgetSummaryItemLabel">Gasto actual total</div>
      </div>
      <div className="budgetSummaryItem">
        <div className="budgetSummaryItemValue porcentageValue">20%</div>
        <div className="budgetSummaryItemLabel">Porcentaje gastado</div>
      </div>
    </div>;
  }
}

export default connect(null, null)(BudgetSummary)
