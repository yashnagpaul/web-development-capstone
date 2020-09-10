import React from "react";
import { Link } from "react-router-dom";

export default function ItemCard(props) {
  return (
    <div className="item-card">
      <Link to={`/shop/${props.id}`}>
        <img src={props.image} alt="" />
        <h4>{props.title}</h4>
        <p>
          By: <i>{props.company}</i>
        </p>
        <h5>{props.description}</h5>
        <p>C${props.price}</p>
      </Link>
    </div>
  );
}
