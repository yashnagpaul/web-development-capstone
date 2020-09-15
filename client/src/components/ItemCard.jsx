import React from "react";
import { Link } from "react-router-dom";

export default function ItemCard(props) {
  return (
    <div className="item-card">
      <Link to={`/shop/${props.id}`}>
        <p>
          Co: <i>{props.company}</i>
        </p>
        <img src={props.image} alt="" />
        <h4>{props.title}</h4>
        <p>{props.description}</p>
        <h5>C${props.price}</h5>
      </Link>
    </div>
  );
}
