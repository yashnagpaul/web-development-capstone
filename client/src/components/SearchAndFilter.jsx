import React from "react";
import axios from "axios";

class SearchAndFilter extends React.Component {
  constructor(props) {
    super(props);
    this.searchField = React.createRef();
  }

  // TODO: fix searchHandler for a scenario when search returns more than 1 results
  // or if search doesn't match any item's name

  searchHandler = () => {
    const query = this.searchField.current.value;
    // const searchQuery = query.toLowerCase();
    axios
      .get("http://localhost:5000/api/items")
      .then((response) => response.data.filter((obj) => obj.title === query))
      .then((result) =>
        result.length >= 1
          ? this.props.searchResult(result)
          : console.log("response.length !== 1")
      );
  };

  render() {
    return (
      <div className="search-and-filter">
        <section>
          <label for="search">
            <b>Search </b>
          </label>
          <input
            ref={this.searchField}
            onKeyUp={this.searchHandler}
            name="search"
            type="search"
            placeholder="Product name"
          ></input>
        </section>
        <section>
          <label for="sort">
            <b>Sort </b>
          </label>
          <select name="sort">
            <option value="price-low-high">Price: Low to High</option>
            <option value="price-high-low">Price: High to Low</option>
          </select>
        </section>
      </div>
    );
  }
}
export default SearchAndFilter;
