import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Header from "./components/Header";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ShopPage from "./components/ShopPage";
import ItemPage from "./components/ItemPage";
import Cart from "./components/Cart";
import AboutPage from "./components/AboutPage";
import AdminSignIn from "./components/AdminSignIn";
import LandingPage from "./components/LandingPage";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Header text="Shoppy-fi" />
      <Switch>
        <Route path="/" component={LandingPage}></Route>
        <Route path="/about" component={AboutPage}></Route>
        <Route path="/shop" component={ShopPage} exact></Route>
        <Route path="/shop/:id" component={ItemPage}></Route>
        <Route path="/cart" component={Cart}></Route>
        <Route path="/login" component={AdminSignIn}></Route>
      </Switch>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
