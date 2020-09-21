import React from "react";
// import { Link } from "react-router-dom";
import axios from "axios";

class ItemPage extends React.Component {
  constructor(props) {
    super(props);
    this.reviewForm = React.createRef();
    this.state = {
      item: {},
      // reviews: [{ name: "A", rating: "A", body: "ok" }],
    };
  }

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

  //FIX commentHandler LOGIC

  commentHandler = (e) => {
    e.preventDefault();
    let existingReviews = this.state.item.reviews;
    const newReview = {
      name: this.reviewForm.current.reviewName.value,
      rating: this.reviewForm.current.rating.value,
      comment: this.reviewForm.current.review.value,
    };
    existingReviews.push(newReview);

    axios
      .patch("http://localhost:5000/api/items", {
        id: this.props.match.params.id,
        comments: existingReviews,
      })
      .then((response) => this.setState({ item: response.data }));
  };

  componentDidMount = () => {
    axios
      .get(`http://localhost:5000/api/items`)
      .then((response) =>
        response.data.filter((obj) => obj.id !== this.props.match.params.id)
      )
      .then((result) => {
        this.setState({ item: result[this.props.match.params.id] });
      });
  };

  render() {
    console.log(this.state.item.reviews);
    return this.state.item.reviews ? (
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
        <section>
          <form ref={this.reviewForm} className="item-page__about-item">
            <h2>Write a review</h2>
            <input
              name="reviewName"
              type="text"
              placeholder="Your name"
            ></input>
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
            <button
              onClick={this.commentHandler}
              className="item-page__submit-review"
            >
              PUBLISH
            </button>
          </form>
          <div>
            <br />
            <h2>{this.state.item.reviews.length} Reviews</h2>
            <br />
            <hr />
            <br />
            {this.state.item.reviews.length > 0
              ? this.state.item.reviews.map((review) => (
                  <div>
                    <p>
                      By: <b>{review.name}</b>
                    </p>
                    <p>{review.rating}</p>
                    <p>{review.comment}</p>
                    <br />
                  </div>
                ))
              : ""}
          </div>
        </section>
      </div>
    ) : (
      <p>"loading"</p>
    );
  }
}

export default ItemPage;
