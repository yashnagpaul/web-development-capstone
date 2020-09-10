import React from "react";
import ItemCard from "./ItemCard";
import { Link } from "react-router-dom";

const cartItems = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : console.log("user hasn't added any items to cart");

class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.deleteBtn = React.createRef();
  }
  //on click -> look at the id and filter the array in localstorage where item.id !== button.id
  // then localStorage.setItem ('cartItem', the filtered Array)
  deleteHandler = (e) => {
    const btnID = this.deleteBtn.current.id;
    console.log(btnID);
    const oldItems = JSON.parse(localStorage.getItem("cartItems"));
    const newItems = oldItems.filter((item) => item.id !== btnID);
    localStorage.setItem("cartItems", JSON.stringify(newItems));
  };

  render() {
    return cartItems ? (
      <section className="cart">
        {cartItems.map((item) => (
          <div>
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
              onClick={this.deleteHandler}
              id={item.id}
              className="cart__delete"
              ref={this.deleteBtn}
            >
              DELETE
            </button>
          </div>
        ))}
        <Link to="/checkout">
          <button className="cart__checkout">CHECKOUT</button>
        </Link>
      </section>
    ) : (
      <div className="cart__error-message">
        Please add something to your cart!
      </div>
    );
  }
}

export default Cart;
