import React from "react";
import ItemCard from "./ItemCard";
import { Link } from "react-router-dom";
// require("dotenv").config();
import StripeCheckout from "react-stripe-checkout";
// import SearchAndFilter from "./SearchAndFilter";

const REACT_APP_KEY = process.env.REACT_APP_KEY;

const cartItems = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : console.log("user hasn't added any items to cart");

let orderTotal = 0;
cartItems.map((item) => (orderTotal += item.price));

class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.deleteBtn = React.createRef();
  }

  product = cartItems;

  //on click -> look at the id and filter the array in localstorage where item.id !== button.id
  // then localStorage.setItem ('cartItem', the filtered Array)
  deleteHandler = (e, id) => {
    console.log(id);
    const oldItems = JSON.parse(localStorage.getItem("cartItems"));
    const newItems = oldItems.filter((item) => item.id !== id);
    localStorage.setItem("cartItems", JSON.stringify(newItems));
  };

  makePayment = (token) => {
    const body = {
      token,
      // product,
    };
    const headers = {
      "Content-Type": "application/json",
    };

    return fetch("http://localhost:8282", {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    })
      .then((response) => {
        console.log("response ", response);
      })
      .catch((error) => console.log(error));
  };

  render() {
    return cartItems.length > 0 ? (
      <>
        <section className="cart">
          {cartItems.map((item) => (
            <div className="cart__item-row">
              {/* <p>{item.title}</p>
              <h5>C${item.price}</h5> */}
              <ItemCard
                key={item.id}
                id={item.id}
                image={item.image}
                title={item.title}
                company={item.company}
                description={item.description}
                price={item.price}
              />
              <button
                onClick={(e) => this.deleteHandler(e, item.id)}
                className="cart__delete"
                ref={this.deleteBtn}
              >
                DELETE
              </button>
              <br />
            </div>
          ))}
        </section>
        {/* <Link to="/checkout"> */}
        <StripeCheckout
          stripeKey="pk_test_51HQSP2HjC2la8EuOQrPdU0KCpAG6woAkPVH6fl7RKKk1eC3BR8nnIP8cmo3uG9vJe9qaVcFmM92cO1jc6xoXW0Us00u58W0cTc"
          token=""
          name={`Order total: C$${orderTotal}`}
          amount={orderTotal * 100}
        >
          <button className="cart__checkout">CHECKOUT</button>
        </StripeCheckout>
        {/* </Link>  */}
      </>
    ) : (
      <div className="cart__error-message">Your cart is empty!</div>
    );
  }
}

export default Cart;
