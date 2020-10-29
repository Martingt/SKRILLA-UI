import * as React from "react";
import "../resources/styles/CategoryList.scss";
import { fetchCategories } from "../controllers/CategoriesController.tsx";
import CategoryButton from "../components/CategoryButton";
import CategoryIcons from "../utils/CategoryIcons.js";
import { getCategoryIcon } from "../controllers/CategoriesController";
import { postDefaultCategories } from "../controllers/CategoriesController.tsx";

export default class CategoriesList extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = { categories: [] };
  }

  componentDidMount() {
    postDefaultCategories().then(this.refreshCategoriesList());
  }

  addColor(category) {
    for (const c in CategoryIcons) {
      if (CategoryIcons[c].name == category) {
        return CategoryIcons[c].color;
      }
    }
    return "#C1E2F6";
  }

  refreshCategoriesList = () => {
    fetchCategories()
      .then((result) => {
        this.setState({ ...this.state, categories: result });
      })
      .catch((error) => console.log("error", error));
  };

  render() {
    var i = 0;

    return (
      <div className="categoriesList">
        <CategoryButton
          operation={"add"}
          triggerCategoriesList={this.refreshCategoriesList}
        />
        {this.state.categories.map((category) => {
          i = i + 1;
          return (
            <div>
              <div className="category" key={i} id={i.toString()}>
                {getCategoryIcon(category.iconDescriptor)}
                <p>{category.name}</p>
              </div>
              <div className="options">
                {category.nonedit ? null : (
                  <div className="categoryOptions">
                    <CategoryButton
                      operation={"edit"}
                      triggerCategoriesList={this.refreshCategoriesList}
                      categoryId={category.categoryId}
                      categoryName={category.name}
                    />
                    <CategoryButton
                      operation={"del"}
                      triggerCategoriesList={this.refreshCategoriesList}
                      categoryId={category.categoryId}
                    />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}
