import React from 'react';
import axios from 'axios';

require('dotenv').config();
const { REACT_APP_BACKEND_URL } = process.env;

class SearchAndFilter extends React.Component {
  constructor(props) {
    super(props);
    this.searchField = React.createRef();
    this.select = React.createRef();
  }

  // TODO: fix searchHandler for a scenario when search returns more than 1 results
  // or if search doesn't match any item's name

  searchHandler = () => {
    const query = this.searchField.current.value;
    query.length >= 1
      ? axios
          .get(`${REACT_APP_BACKEND_URL}/api/items`)
          .then((response) =>
            response.data.filter((obj) => obj.title === query)
          )
          .then((result) =>
            result.length >= 1
              ? this.props.searchResult(result)
              : console.log('response.length < 1 ')
          )
      : axios
          .get('${REACT_APP_BACKEND_URL}/api/items')
          .then((response) => this.props.searchResult(response.data));
  };

  sortHandler = (e) => {
    if (e.target.value === 'price-low-high') {
      axios
        .get(`${REACT_APP_BACKEND_URL}/api/items`)
        .then((response) => {
          const sortedArr = response.data.sort(function (a, b) {
            return a.price - b.price;
          });
          return sortedArr;
        })
        .then((result) => this.props.searchResult(result))
        .catch((err) => console.log(err));
    } else if (e.target.value === 'price-high-low') {
      axios
        .get(`${REACT_APP_BACKEND_URL}/api/items`)
        .then((response) => {
          const sortedArr = response.data.sort(function (a, b) {
            return b.price - a.price;
          });
          return sortedArr;
        })
        .then((result) => this.props.searchResult(result))
        .catch((err) => console.log(err));
    } else if (e.target.value === 'alphabetic-order') {
      axios
        .get(`${REACT_APP_BACKEND_URL}/api/items`)
        .then((response) => {
          const sortedArr = response.data.sort(function (a, b) {
            return a.title - b.title;
          });
          return sortedArr;
        })
        .then((result) => this.props.searchResult(result))
        .catch((err) => console.log(err));
    }
  };

  render() {
    return (
      <div className='search-and-filter'>
        <section>
          <label htmlFor='search'>
            <b>Search </b>
          </label>
          <input
            ref={this.searchField}
            onKeyDown={this.searchHandler}
            name='search'
            type='search'
            placeholder='Product name'
          ></input>
        </section>
        <section>
          <label htmlFor='sort'>
            <b>Sort </b>
          </label>
          <select
            // ref={this.select}
            onChange={(e) => this.sortHandler(e)}
            name='sort'
          >
            <option>Select</option>
            <option value='alphabetic-order'>Alphabetic A-Z</option>
            <option value='price-low-high'>Price: Low to High</option>
            <option value='price-high-low'>Price: High to Low</option>
          </select>
        </section>
      </div>
    );
  }
}
export default SearchAndFilter;
