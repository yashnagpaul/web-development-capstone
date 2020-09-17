import React from "react";
// import { Link } from "react-router-dom";
import axios from "axios";

class ItemPage extends React.Component {
  state = {
    item: {},
  };

  addToCartHandler = () => {
    const existingCartItems = localStorage.getItem("cartItems");
    let newCartItems = [];
    existingCartItems
      ? newCartItems.push(...JSON.parse(existingCartItems))
      : console.log("no items in cart");
    newCartItems.push(this.state.item);
    localStorage.setItem("cartItems", JSON.stringify(newCartItems));
    this.props.cartItemsUpdated(
      JSON.parse(localStorage.getItem("cartItems")).length
    );
  };

  componentDidMount() {
    axios
      .get(`http://localhost:5000/api/items`)
      .then((response) =>
        response.data.filter((obj) => obj.id !== this.props.match.params.id)
      )
      .then((result) => {
        this.setState({ item: result[this.props.match.params.id] });
      });
  }

  render() {
    console.log(this.state.item);
    return this.state.item ? (
      <div className="item-page">
        <section className="item-page__item">
          <div>
            <img src={this.state.item.image} alt="" />
            <h2>{this.state.item.title}</h2>
            <h3>By: {this.state.item.company}</h3>
            <p>{this.state.item.description}</p>
            <h5>Price: C${this.state.item.price}</h5>
          </div>
          <button onClick={this.addToCartHandler} type="button">
            ADD TO CART
          </button>
        </section>
        <form className="item-page__about-item">
          <p>Be the first one to write a review:</p>
          <input type="text" placeholder="Your order #"></input>
          <select name="rating">
            <option>⭐⭐⭐⭐⭐</option>
            <option>⭐⭐⭐⭐</option>
            <option>⭐⭐⭐</option>
            <option>⭐⭐</option>
            <option>⭐</option>
          </select>
          <textarea
            name="review"
            id=""
            cols="40"
            rows="5"
            placeholder="Write something..."
          ></textarea>
          <button className="item-page__submit-review">PUBLISH</button>
        </form>
      </div>
    ) : (
      console.log("loading")
    );
  }
}

export default ItemPage;
