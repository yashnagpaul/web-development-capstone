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
import Checkout from "./components/Checkout";
import Footer from "./components/Footer";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Header text="Shoppy-fi" />
      <Switch>
        <Route path="/" component={LandingPage} exact></Route>
        <Route path="/about" component={AboutPage}></Route>
        <Route path="/shop" component={ShopPage} exact></Route>
        <Route path="/shop/:id" component={ItemPage}></Route>
        <Route path="/cart" component={Cart}></Route>
        <Route path="/login" component={AdminSignIn}></Route>
        <Route path="/checkout" component={Checkout}></Route>
      </Switch>
      <Footer />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
