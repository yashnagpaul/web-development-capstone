import React from "react";

const items = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];
let total = 0;
items.map((item) => (total += item.price));
total = total + (12 / 100) * total;
total = Math.round(total * 100) / 100 + 4.99;

const Checkout = () => {
  return total ? (
    <div className="checkout-page">
      <h2>Order total: C${total}*</h2>
      <h6>*includes applicable taxes and flat $4.99 shipping</h6>
      <input type="email" placeholder="Email" />
      <input type="text" placeholder="Credit Card" />
      <input type="text" placeholder="Valid thru" />
      <input type="text" placeholder="CVV" />

      <button type="submit">Confirm</button>
    </div>
  ) : (
    <p>Consumer hasn't added any products to their cart.</p>
  );
};

export default Checkout;
