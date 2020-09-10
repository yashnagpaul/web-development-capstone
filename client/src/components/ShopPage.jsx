import React from "react";
import axios from "axios";

import ItemCard from "./ItemCard";

class ShopPage extends React.Component {
  state = {
    items: [],
  };

  componentDidMount() {
    axios
      .get("http://localhost:5000/api/items")
      .then((response) => this.setState({ items: response.data }));
  }

  render() {
    return this.state.items ? (
      <div className="shop">
        {this.state.items.map((item) => (
          <ItemCard
            id={item.id}
            image={item.image}
            title={item.title}
            company={item.company}
            description={item.description}
            price={item.price}
            key={item.id}
          />
        ))}
      </div>
    ) : (
      console.log("loading content")
    );
  }
}

export default ShopPage;
