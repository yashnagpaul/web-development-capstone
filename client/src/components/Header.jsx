import React from "react";
import { Link } from "react-router-dom";

export default function Header(props) {
  return (
    <div className="header">
      <h2>{props.text}</h2>
      Empowering youth entrepreneurs.
      <br />
      And the future of Canada.
      <div>
        <Link to="/shop">
          <button>Shop</button>
        </Link>
        <button>About</button>
      </div>
    </div>
  );
}
