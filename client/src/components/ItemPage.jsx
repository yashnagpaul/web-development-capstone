import React from "react";
// import { Link } from "react-router-dom";
import axios from "axios";

class ItemCard extends React.Component {
  state = {
    item: {},
  };

  componentDidMount() {
    axios
      .get(`http://localhost:5000/api/items`)
      .then((response) =>
        response.data.filter((obj) => obj.id === this.props.match.params.id)
      )
      .then((result) => {
        this.setState({ item: result });
      });
  }

  render() {
    return this.state.item ? (
      <>
        <img src={this.state.item.image} alt="" />
        <h3>{this.state.item.title}</h3>
        <p>{this.state.item.company}</p>
        <h4>{this.state.item.description}</h4>
        <p>{this.state.item.price}</p>
      </>
    ) : (
      console.log("loading")
    );
  }
}

export default ItemCard;
