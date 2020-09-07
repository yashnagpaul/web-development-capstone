import React from "react";
import { Link } from "react-router-dom";

export default function ItemCard(props) {
  return (
    <Link to={`/shop/${props.id}`}>
      <img src={props.image} alt="" />
      <h3>{props.title}</h3>
      <p>{props.company}</p>
      <h4>{props.description}</h4>
      <p>{props.price}</p>
    </Link>
  );
}
