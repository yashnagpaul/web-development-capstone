import React from "react";
import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div className="landing-page">
      <h3>
        <strong>We empower youth entrepreneurs.</strong>
      </h3>
      <div>
        <Link to="/shop">
          <button>SHOP</button>
        </Link>
        <Link to="/about">
          <button>ABOUT US</button>
        </Link>
        <Link to="/login">
          <button>ADMIN SIGN-IN</button>
        </Link>
      </div>
    </div>
  );
}

export default LandingPage;