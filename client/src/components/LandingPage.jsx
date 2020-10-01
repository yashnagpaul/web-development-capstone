import React from "react";
import { Link } from "react-router-dom";

function LandingPage() {
  localStorage.getItem("cartItems")
    ? console.log("cartItemsExists")
    : localStorage.setItem("cartItems", []);

  // console.log(localStorage.getItem("cartItems"));

  return (
    <div className="landing-page">
      <h1>
        <strong>
          We empower <br />
          youth entrepreneurs
        </strong>
      </h1>
      <div className="landing-page__button-div">
        <Link to="/shop">
          <button className="landing-page__button">GO SHOPPING!</button>
        </Link>
        {/* <Link to="/admin">
          <button className="landing-page__button">ADMIN</button>
        </Link> */}
      </div>
    </div>
  );
}

export default LandingPage;
