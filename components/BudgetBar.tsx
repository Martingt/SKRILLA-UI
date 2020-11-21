import * as React from "react";
import "./resources/styles/pieChart.scss";
import {
  XYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  VerticalBarSeries,
  Hint,
} from "react-vis";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { fetchBudgetSummary } from "../controllers/BudgetController";

function buildValue(hoveredCell) {
  return {
    monto: hoveredCell.y,
  };
}
export default class BudgetPieChart extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      budgetItems: [],
      hoveredCell: false,
      month: new Date().getMonth(),
      year: new Date().getFullYear(),
    };
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    fetchBudgetSummary(null)
      .then((result) => {
        this.setState({ ...this.state, budgetItems: result.categoryItems });
      })
      .catch((error) => console.log("error", error));
  }
  createDataChart() {
    var data = [];
    if (this.state.budgetItems.length != 0) {
      this.state.budgetItems.map((budget) => {
        if (budget.budgetedAmount > 0) {
          data.push({ x: budget.category.name, y: budget.totalSpent });
        }
      });
    }
    return data;
  }
  createBudgetData() {
    var data = [];
    if (this.state.budgetItems.length != 0) {
      this.state.budgetItems.map((budget) => {
        if (budget.budgetedAmount > 0) {
          data.push({
            x: budget.category.name,
            y: budget.budgetedAmount - budget.totalSpent,
          });
        }
      });
    }
    return data;
  }
  handleChange(event) {
    event.target.name == "month"
      ? this.setState({ [event.target.name]: event.target.value }, () =>
          this.fetchData()
        )
      : event.target.name == "year"
      ? this.setState({ [event.target.name]: event.target.value }, () =>
          this.fetchData()
        )
      : "";
  }
  tooltipData(cell) {
    for (const i in this.state.budgetItems) {
      if (this.state.budgetItems[i].category.name == cell.x) {
        const percentage =
          (this.state.budgetItems[i].totalSpent /
            this.state.budgetItems[i].budgetedAmount) *
          100;
        return percentage.toFixed(1) + "%";
      }
    }
  }
  render() {
    const { hoveredCell } = this.state;
    const month = [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ];
    const year = ["2020", "2019", "2018", "2017"];
    if (this.state.budgetItems.length > 0) {
      return (
        <div id="content" className="content">
          <div className="titleChart">
            <h3>Avance del presupuesto</h3>
          </div>
          <div className="date-picker">
            <div>
              <Select
                inputProps={{ name: "month" }}
                value={this.state.month}
                onChange={this.handleChange}
              >
                {month.map((month, key) => {
                  return <MenuItem value={key}>{month}</MenuItem>;
                })}
              </Select>
            </div>
            <div>
              <Select
                inputProps={{ name: "year" }}
                value={this.state.year}
                onChange={this.handleChange}
              >
                {year.map((year, key) => {
                  return <MenuItem value={2020 - key}>{year}</MenuItem>;
                })}
              </Select>
            </div>
          </div>
          <div className="pie-chart">
            <div className="chart">
              <XYPlot
                xType="ordinal"
                width={450}
                height={250}
                margin={{ left: 75, right: 20 }}
                stackBy="y"
              >
                <VerticalGridLines />
                <HorizontalGridLines />
                <XAxis />
                <YAxis />
                <VerticalBarSeries
                  data={this.createDataChart()}
                  onValueMouseOver={(v) => {
                    this.setState({ hoveredCell: v.x && v.y ? v : false });
                  }}
                  onValueMouseOut={() => this.setState({ hoveredCell: false })}
                />
                <VerticalBarSeries
                  data={this.createBudgetData()}
                  onValueMouseOver={(v) => {
                    this.setState({ hoveredCell: v.x && v.y ? v : false });
                  }}
                  onValueMouseOut={() => this.setState({ hoveredCell: false })}
                />
                {hoveredCell ? (
                  <Hint
                    value={buildValue(hoveredCell)}
                    align={{ vertical: "top", horizontal: "left" }}
                  >
                    <div
                      style={{
                        marginRight: 80,
                        marginTop: -250,
                        backgroundColor: "black",
                        opacity: 0.75,
                        width: 100,
                      }}
                    >
                      <h3 style={{ color: "white", textAlign: "center" }}>
                        Avance
                      </h3>
                      <p
                        style={{
                          color: "white",
                          justifyContent: "center",
                          flex: 1,
                          display: "flex",
                        }}
                      >
                        {this.tooltipData(hoveredCell)}
                      </p>
                    </div>
                  </Hint>
                ) : null}
              </XYPlot>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="content">
          <div className="titleChart">
            <h3>Presupuesto por categoria</h3>
          </div>
          <div className="date-picker">
            <div>
              <Select
                inputProps={{ name: "month" }}
                value={this.state.month}
                onChange={this.handleChange}
              >
                {month.map((month, key) => {
                  return <MenuItem value={key}>{month}</MenuItem>;
                })}
              </Select>
            </div>
            <div>
              <Select
                inputProps={{ name: "year" }}
                value={this.state.year}
                onChange={this.handleChange}
              >
                {year.map((year, key) => {
                  return <MenuItem value={2020 - key}>{year}</MenuItem>;
                })}
              </Select>
            </div>
          </div>
          <div style={{ width: 400, height: 300 }} className="noChart">
            <img
              style={{
                width: 160,
                height: 150,
                marginBottom: 10,
                marginTop: 40,
              }}
              src="/images/no-budget.png"
            ></img>
            <h2>Ups!</h2>
            <p style={{ textAlign: "center", marginTop: 10 }}>
              No tienes presupuesto armado!
            </p>
          </div>
        </div>
      );
    }
  }
}
