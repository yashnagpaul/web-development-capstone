import React from "react";
import { Link, NavLink } from "react-router-dom";

import cartIcon from "../assets/icons/supermarket.svg";

class Header extends React.Component {
  state = { numberOfItems: 0, loggedIn: false };

  componentDidMount() {
    if (localStorage.getItem("token")) {
      this.setState({ loggedIn: true });
    }
  }

  // componentDidUpdate() {
  //   if (!localStorage.getItem("token")) {
  //     this.setState({ loggedIn: false });
  //   }
  // }

  // also set state for number of items in cart

  render() {
    return (
      <div className="header">
        <Link to="/">
          <h1>🍒 le marché</h1>
        </Link>

        <div>
          <button
            style={{
              display: this.props.isLoggedIn ? "inline" : "none",
            }}
            className="admin-page__logout-btn"
            onClick={() => {
              localStorage.removeItem("token");
              this.setState({ loggedIn: false });
              this.props.logInUpdate(this.state.loggedIn);
            }}
          >
            LOG OUT
          </button>
          <NavLink to="/shop" className="header__link">
            Market
          </NavLink>
          <NavLink to="/admin" className="header__link">
            Admin
          </NavLink>
          <NavLink to="/about" className="header__link">
            About
          </NavLink>
          <NavLink to="/cart">
            <img src={cartIcon} alt="cart" className="header__cart"></img>
            {this.props.numberOfCartItems}
          </NavLink>
        </div>
      </div>
    );
  }
}

export default Header;
