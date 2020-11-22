import App from "next/app";
import React from "react";
import { createStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import loginReducer from "../redux/LoginReducer";
const store = createStore(loginReducer);

export default class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    );
  }
}
