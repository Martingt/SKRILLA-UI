import * as React from "react";
import { Select } from "@material-ui/core";
import "Styles/category.scss";
import { fetchCategories } from "../controllers/CategoriesController";
import CategoryIcons from "../utils/CategoryIcons.js";

export default class CategoryIconsList extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = { availableCategoryIcons: [] };
  }

  isAnyCategoryUsingThisIcon(iconName, categories) {
    for (const c in categories) {
      if (categories[c].iconDescriptor == iconName) {
        return true;
      }
    }
    return false;
  }

  getAvailableCategoryIcons(categories) {
    let availableCategoryList = [];
    for (const c in CategoryIcons) {
      if (!this.isAnyCategoryUsingThisIcon(CategoryIcons[c].name, categories)) {
        availableCategoryList.push(CategoryIcons[c].name);
      }
    }
    return availableCategoryList;
  }

  componentDidMount() {
    fetchCategories()
      .then((result) => {
        this.setState({
          availableCategoryIcons: this.getAvailableCategoryIcons(result),
        });
      })
      .catch((error) => console.log("error", error));
  }

  render() {
    var i = 0;
    return (
      <Select
        native
        value={this.props.value}
        name="categoryIcon"
        onChange={this.props.onChange}
        inputProps={{
          name: "categoryIcon",
          id: "category-icon-select",
        }}
      >
        <option key={i}></option>
        {this.state.availableCategoryIcons.map((availableCategoryIcon) => {
          i = i + 1;
          return <option key={i}>{availableCategoryIcon}</option>;
        })}
      </Select>
    );
  }
}
