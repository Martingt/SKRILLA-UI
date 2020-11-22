import * as React from "react";
import "@/resources/pieChart.scss";
import { getConsumptionPerCategory } from "../controllers/ConsumptionsController";
import { RadialChart } from "react-vis";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

export default class CategoryPieChart extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      conspercat: [],
      category: [],
      disablecats: [],
      month: new Date().getMonth(),
      year: new Date().getFullYear(),
    };
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount() {
    this.fetchData();
    this.createCategory();
  }

  fetchData() {
    getConsumptionPerCategory(
      this.state.month,
      this.state.year
    ).then((result) =>
      this.setState({ conspercat: result }, this.createCategory)
    );
  }
  createCategory() {
    var data = [];
    for (const i in this.state.conspercat) {
      data.push({ name: this.state.conspercat[i].category, check: true });
    }
    this.setState({ category: data });
  }
  createDataChart() {
    var data = [];
    if (this.state.conspercat.length != 0) {
      this.state.conspercat.map((consumption) => {
        data.push({ label: consumption.category, angle: consumption.amount });
      });
    }
    return data;
  }
  handleChange(event) {
    console.log(event.target);
    event.target.name == "month"
      ? this.setState({ [event.target.name]: event.target.value }, () =>
          this.fetchData()
        )
      : event.target.name == "year"
      ? this.setState({ [event.target.name]: event.target.value }, () =>
          this.fetchData()
        )
      : this.checkboxChanges(event);
  }
  checkboxChanges(e) {
    var category = this.state.category;
    for (const i in category) {
      if (category[i].name == e.target.value) {
        if (category[i].check == true) {
          category[i].check = false;
          this.deleteConspercat(e);
        } else {
          category[i].check = true;
          this.addConspercat(e);
        }
      }
    }
  }
  deleteConspercat(e) {
    var conspercat = this.state.conspercat;
    for (const i in conspercat) {
      if (conspercat[i].category == e.target.value) {
        this.state.disablecats.push({ conspercat: conspercat[i], index: i });
        conspercat.splice(i, 1);
        this.setState({ ...this.state, conspercat: conspercat });
      }
    }
  }
  addConspercat(e) {
    var conspercat = this.state.conspercat;
    var disablecats = this.state.disablecats;
    for (const i in disablecats) {
      if (this.state.disablecats[i].conspercat.category == e.target.value) {
        conspercat.splice(disablecats[i].index, 0, disablecats[i].conspercat);
        disablecats.splice(i, 1);
        this.setState({ ...this.state, conspercat: conspercat });
      }
    }
  }
  render() {
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

    if (this.state.conspercat.length > 0) {
      return (
        <div id="content" className="content">
          <div className="titleChart">
            <h3>Consumos por categoria</h3>
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
            <div className="categories">
              {this.state.category.map((category) => {
                return (
                  <div className="optionCategory">
                    <input
                      type="checkbox"
                      className="inputCategory"
                      value={category.name}
                      checked={category.check}
                      onChange={this.handleChange}
                    ></input>
                    <label>{category.name}</label>
                  </div>
                );
              })}
            </div>
            <div className="chart">
              <RadialChart
                data={this.createDataChart()}
                width={300}
                height={250}
                showLabels={true}
                radius={120}
              />
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="content">
          <div className="titleChart">
            <h3>Consumos por categoria</h3>
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
              src="/images/no-piechart.png"
            ></img>
            <h2>Ups!</h2>
            <p style={{ textAlign: "center", marginTop: 10 }}>
              No tienes consumos este mes!
            </p>
          </div>
        </div>
      );
    }
  }
}
