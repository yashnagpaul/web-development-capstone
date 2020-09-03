import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Header from "./components/Header";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ShopPage from "./components/ShopPage";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Header text="Shoppy-fi" />
      <Switch>
        <Route path="/shop" component={ShopPage}></Route>
      </Switch>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
