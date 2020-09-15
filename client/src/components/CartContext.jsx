import React, { createContext } from "react";

export const MovieContext = createContext();

export const CartProvider = () => {
  const cartItems = JSON.parse(localStorage.getItem, "cartItems");

  return 1;
};
