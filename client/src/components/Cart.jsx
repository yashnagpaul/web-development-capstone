import React, { createContext } from "react";
import ItemCard from "./ItemCard";
import { Link } from "react-router-dom";
// require("dotenv").config();
import StripeCheckout from "react-stripe-checkout";
// import SearchAndFilter from "./SearchAndFilter";
import { CartContext } from "./CartContext";

const REACT_APP_KEY = process.env.REACT_APP_KEY;

let cartItems = JSON.parse(localStorage.getItem("cartItems"));

class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.deleteBtn = React.createRef();
    this.qty = React.createRef();
    this.state = {
      cartItems: [],
    };
  }

  calculateTotal = () => {
    let orderTotal = 0;
    this.state.cartItems.map((item) => (orderTotal = orderTotal + item.price));
    return orderTotal;
  };
  // product = cartItems;

  //on click -> look at the id and filter the array in localstorage where item.id !== button.id
  // then localStorage.setItem ('cartItem', the filtered Array)
  deleteHandler = (e, id) => {
    console.log(id);
    const oldItems = JSON.parse(localStorage.getItem("cartItems"));
    const newItems = oldItems.filter((item) => item.id !== id);
    localStorage.setItem("cartItems", JSON.stringify(newItems));
    this.setState({ cartItems: newItems });
    this.props.cartItemsUpdated(this.state.cartItems.length);
  };

  // quantityUpdated = (itemID, value) => {
  //   if (value >= 1) {
  //     let itemToUpdate = this.state.cartItems.find(
  //       (item) => item.id === itemID
  //     );
  //     console.log(itemToUpdate.price);
  //     itemToUpdate.price = itemToUpdate.price * value;
  //     const newItems = this.state.cartItems.splice(
  //       itemToUpdate.id,
  //       1,
  //       itemToUpdate
  //     );
  //     this.setState({ cartItems: newItems });
  //     console.log(itemID);
  //     console.log(value);
  //   }
  // };

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

  componentDidMount() {
    // console.log(this.context);
    this.setState({
      cartItems: localStorage.getItem("cartItems")
        ? JSON.parse(localStorage.getItem("cartItems"))
        : [],
    });
    this.props.cartItemsUpdated(this.state.cartItems.length);
  }

  // static contextType = CartContext;

  render() {
    return this.state.cartItems.length > 0 ? (
      <>
        <section className="cart">
          {this.state.cartItems.map((item) => (
            <div className="cart__item-row">
              <ItemCard
                key={item.id}
                id={item.id}
                image={item.image}
                title={item.title}
                company={item.company}
                description={item.description}
                price={`${item.price}`}
              />
              <div className="cart__input-group">
                {/* <input
                  ref={this.qty}
                  onChange={() =>
                    this.quantityUpdated(item.id, this.qty.current.value)
                  } //when quantity is changed, send it to state
                  className="cart__quantity"
                  type="number"
                  placeholder="Quantity"
                ></input> */}
                <button
                  onClick={(e) => this.deleteHandler(e, item.id)}
                  className="cart__delete"
                  ref={this.deleteBtn}
                >
                  DELETE
                </button>
              </div>
              <br />
            </div>
          ))}
        </section>
        <StripeCheckout
          stripeKey="pk_test_51HQSP2HjC2la8EuOg1AvcdcQowgS0Fgl3tiXoezVICVhhrdJpGApir7KYqSaKvS4kdJsIE1YdENEBLMVfK2iPIlZ005wP5Xfmf"
          token=""
          name={`Confirm order`}
          amount={
            (
              this.calculateTotal() +
              4.99 +
              (12 / 100) * this.calculateTotal()
            ).toFixed(2) * 100
          }
        >
          <button
            // onClick={this.setState({ cartItems: [] })}
            className="cart__checkout"
          >
            CHECKOUT*
          </button>
        </StripeCheckout>
        <h6 className="shipping-fee-message">
          *applicable taxes and flat shipping fee of C$4.99 added at checkout
        </h6>
      </>
    ) : (
      <div className="cart__error-message">Your cart is empty!</div>
    );
  }
}

export default Cart;
