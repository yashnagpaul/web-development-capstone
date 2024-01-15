import React from 'react';
import Header from './components/Header';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ShopPage from './views/ShopPage';
import ItemPage from './views/ItemPage';
import Cart from './components/Cart';
import AboutPage from './views/AboutPage';
import LandingPage from './views/LandingPage';
import Checkout from './components/Checkout';
import AdminPage from './views/AdminPage';
// import Footer from "./components/Footer";

class App extends React.Component {
  state = {
    numberOfCartItems:
      localStorage.getItem('cartItems') &&
      JSON.parse(localStorage.getItem('cartItems')).length,
    isLoggedIn: false,
  };

  cartItemsUpdated = (newNumber) => {
    this.setState({
      numberOfCartItems: JSON.parse(localStorage.getItem('cartItems')).length,
    });
  };

  logInUpdate = (bool) => {
    this.setState({ isLoggedIn: bool });
  };

  componentDidMount() {
    localStorage.getItem('token') && this.setState({ isLoggedIn: true });
  }

  render() {
    return (
      <BrowserRouter>
        <Header
          numberOfCartItems={this.state.numberOfCartItems}
          logInUpdate={this.logInUpdate}
          isLoggedIn={this.state.isLoggedIn}
        />
        <Switch>
          <Route
            path='/'
            component={LandingPage}
            exact
          ></Route>
          <Route
            path='/about'
            component={AboutPage}
          ></Route>
          <Route
            path='/shop'
            component={ShopPage}
            exact
          ></Route>
          <Route
            path='/shop/:id'
            render={(routeProps) => (
              <ItemPage
                cartItemsUpdated={this.cartItemsUpdated}
                {...routeProps}
              />
            )}
          ></Route>
          <Route
            path='/cart'
            render={(routeProps) => (
              <Cart
                cartItemsUpdated={this.cartItemsUpdated}
                {...routeProps}
              />
            )}
          ></Route>
          <Route
            path='/checkout'
            component={Checkout}
          ></Route>
          <Route
            path='/admin'
            render={(routeProps) => (
              <AdminPage
                loggedInStatus={this.state.isLoggedIn}
                logInUpdate={this.logInUpdate}
                {...routeProps}
              />
            )}
          ></Route>
        </Switch>
        {/* <Footer /> */}
      </BrowserRouter>
    );
  }
}

export default App;
