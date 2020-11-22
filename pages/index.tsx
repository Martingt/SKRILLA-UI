import * as React from "react";
import "@/resources/sign-in.scss";
import "@/resources/homescreen.scss";
import AppView from "../Views/AppView";

export default class IndexPage extends React.Component<any, any> {
  constructor(props) {
    super(props);
  }

  render() {
    return <AppView />;
  }
}
