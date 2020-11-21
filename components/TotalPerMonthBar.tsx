import * as React from "react";
import "./resources/styles/totalPerMonth.scss";
import {
  XYPlot,
  VerticalBarSeries,
  HorizontalGridLines,
  VerticalGridLines,
  XAxis,
  YAxis,
  Hint,
} from "react-vis";
import { fetchTotalPerMonth } from "../controllers/ConsumptionsController";
import NumberFormat from "react-number-format";
function buildValue(hoveredCell) {
  return {
    monto: hoveredCell.y,
  };
}
export default class CategoryPieChart extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      totalpermonth: [],
      hoveredCell: false,
    };
  }
  componentDidMount() {
    this.fetchTotal();
  }
  fetchTotal() {
    fetchTotalPerMonth().then((result) =>
      this.setState({ totalpermonth: result })
    );
  }
  createDataChart() {
    var data = [];
    this.state.totalpermonth.map((consumption) => {
      data.push({
        x: new Date(consumption.year, consumption.month - 1),
        y: consumption.amount,
      });
    });
    data.sort(function (a, b) {
      let left: any = new Date(a.x);
      let right: any = new Date(b.x);
      return left - right;
    });
    data.map((cons) => {
      cons.x = cons.x.getMonth() + 1 + "/" + cons.x.getFullYear();
    });
    return data;
  }
  render() {
    const { hoveredCell } = this.state;
    if (this.state.totalpermonth.length > 0) {
      return (
        <div className="content">
          <div className="titleChart">
            <h3>Consumos totales por mes</h3>
          </div>
          <div className="barChart">
            <XYPlot
              width={450}
              height={300}
              xType="ordinal"
              margin={{ left: 75 }}
            >
              <XAxis />
              <YAxis />
              <HorizontalGridLines />
              <VerticalGridLines />

              <VerticalBarSeries
                data={this.createDataChart()}
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
                      Monto
                    </h3>
                    <NumberFormat
                      style={{
                        color: "white",
                        justifyContent: "center",
                        flex: 1,
                        display: "flex",
                      }}
                      value={buildValue(hoveredCell).monto}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"$"}
                    />
                  </div>
                </Hint>
              ) : null}
            </XYPlot>
          </div>
        </div>
      );
    } else {
      return (
        <div className="content">
          <div className="titleChart">
            <h3>Consumos totales por mes</h3>
          </div>
          <div style={{ width: 450, height: 350 }} className="noChart">
            <img
              style={{
                width: 150,
                height: 150,
                marginBottom: 10,
                marginTop: 40,
              }}
              src="/images/no-bar-series.png"
            ></img>
            <h2>Ups!</h2>
            <p style={{ textAlign: "center", marginTop: 10 }}>
              Aun no posees consumos suficientes para mostrar este grafico.
            </p>
          </div>
        </div>
      );
    }
  }
}
