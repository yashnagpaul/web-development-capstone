import React from "react";
import { Link, NavLink } from "react-router-dom";

import cartIcon from "../assets/icons/supermarket.svg";

export default function Header(props) {
  return (
    <div className="header">
      <Link to="/">
        <h1>🍒 le marché</h1>
      </Link>

      <div>
        <NavLink to="/shop" className="header__link">
          Shop
        </NavLink>
        <NavLink to="/admin" className="header__link">
          Admin
        </NavLink>
        <NavLink to="/about" className="header__link">
          About
        </NavLink>
        <NavLink to="/cart">
          <img src={cartIcon} alt="cart" className="header__cart"></img>
          {JSON.parse(localStorage.getItem("cartItems")).length > 0
            ? JSON.parse(localStorage.getItem("cartItems")).length
            : ""}
        </NavLink>
      </div>
    </div>
  );
}
