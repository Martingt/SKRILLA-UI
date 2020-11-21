import * as React from "react";
import "../resources/styles/sign-in.scss";
import "../resources/styles/homescreen.scss";
import AppView from "../Views/AppView";

export default class IndexPage extends React.Component<any, any> {
  constructor(props) {
    super(props);
  }

  render() {
    return <AppView />;
  }
}
