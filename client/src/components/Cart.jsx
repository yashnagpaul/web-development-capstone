import React from "react";
import ItemCard from "./ItemCard";
import { Link } from "react-router-dom";

const cartItems = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : console.log("user hasn't added any items to cart");

const Cart = (props) => {
  console.log(cartItems);
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
          <button id={cartItems[0].id} className="cart__delete">
            DELETE
          </button>
        </div>
      ))}
      <Link to="/checkout">
        <button className="cart__checkout">CHECKOUT</button>
      </Link>
    </section>
  ) : (
    <div>Please add something to your cart!</div>
  );
};

export default Cart;
