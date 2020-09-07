import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Header from "./components/Header";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ShopPage from "./components/ShopPage";
import ItemPage from "./components/ItemPage";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Header text="Shoppy-fi" />
      <Switch>
        <Route path="/shop" component={ShopPage} exact></Route>
        <Route path="/shop/:id" component={ItemPage}></Route>
      </Switch>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
