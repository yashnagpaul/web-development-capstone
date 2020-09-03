import React from "react";

export default function ItemCard() {
  return (
    <div>
      <img src="" alt="" />
      <h3>{props.title}</h3>
      <p>{props.company}</p>
      <h4>{props.description}</h4>
      <p>{props.price}</p>
    </div>
  );
}
