import React from "react";
import ItemCard from "./ItemCard";

const cartItems = JSON.parse(sessionStorage.getItem("cartItems"));

const Cart = (props) => {
  console.log(cartItems);
  return (
    <>
      <ItemCard
        id={cartItems.id}
        image={cartItems.image}
        title={cartItems.title}
        company={cartItems.company}
        description={cartItems.description}
        price={cartItems.price}
      />
      <button id={cartItems.id}>DELETE</button>
      <button>CHECKOUT</button>
    </>
  );
};

export default Cart;
