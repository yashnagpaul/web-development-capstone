import React from "react";
import ItemCard from "./ItemCard";
// import { Link } from "react-router-dom";
// require("dotenv").config();
import StripeCheckout from "react-stripe-checkout";
// import SearchAndFilter from "./SearchAndFilter";

// const REACT_APP_KEY = process.env.REACT_APP_KEY;

// let cartItems = JSON.parse(localStorage.getItem("cartItems"));

class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.deleteBtn = React.createRef();
    this.qty = React.createRef();
    this.state = {
      cartItems: [],
    };
  }

  clickPay = () => {
    window.alert("Paid");
  };

  calculateTotal = () => {
    let orderTotal = 0;
    this.state.cartItems.map(
      (item) => (orderTotal = orderTotal + item.price * item.quantity)
    );
    return orderTotal;
  };
  // product = cartItems;

  //on click -> look at the id and filter the array in localstorage where item.id !== button.id
  // then localStorage.setItem ('cartItem', the filtered Array)
  deleteHandler = (e, id) => {
    const oldItems = JSON.parse(localStorage.getItem("cartItems"));
    const newItems = oldItems.filter((item) => item.id !== id);
    localStorage.setItem("cartItems", JSON.stringify(newItems));
    this.setState({ cartItems: newItems });
    this.props.cartItemsUpdated(this.state.cartItems.length);
  };

  quantityUpdated = (itemID, userInput) => {
    if (!userInput) userInput = 1;
    let index = this.state.cartItems.findIndex((item) => item.id === itemID);
    console.log("index", index); // find the index of the item to be updated

    let newCartItems = [...this.state.cartItems];
    console.log("newCartItems", newCartItems); // create a copy of the cartItems array in state

    newCartItems[index] = { ...newCartItems[index], quantity: userInput };
    console.log("newCartItems[index]", newCartItems[index]); // update the quantity of the item that needs to be updated

    this.setState({ cartItems: newCartItems });
    // use the new array with the updated item and setState
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

  componentDidMount() {
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
            <div key={item.id} className="cart__item-row">
              <ItemCard
                key={item.id}
                id={item.id}
                image={item.image}
                title={item.title}
                company={item.company}
                description={item.description}
                price={item.price * item.quantity}
              />
              <div className="cart__input-group">
                <input
                  ref={this.qty}
                  onChange={(e) =>
                    this.quantityUpdated(item.id, e.target.value)
                  }
                  //instead of fiddling with the param, change the logic of the function
                  className="cart__quantity"
                  type="number"
                  placeholder="Qty: 1"
                  min="1"
                ></input>
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
          onClick={this.clickPay}
          stripeKey="pk_test_51HQSP2HjC2la8EuOmD5dLR1accVfLPgtFl0oXNNtXxNIsDkVJbtQmEPabbcUI8atQ3LoqmJmSsX48BKdhl4Ng0cs00jIzoVfsp"
          token={() => {
            "";
          }}
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
