import React from 'react';
import axios from 'axios';

import ItemCard from '../components/ItemCard';
import SearchAndFilter from '../components/SearchAndFilter';

require('dotenv').config();
const { REACT_APP_BACKEND_URL } = process.env;

class ShopPage extends React.Component {
  state = {
    items: [],
  };

  componentDidMount() {
    axios
      .get(`${REACT_APP_BACKEND_URL}/api/items`)
      .then((response) => this.setState({ items: response.data }));
  }

  // searchResult function is passed as a prop to the search bar

  searchResult = (recievedData) => {
    console.log(recievedData);
    this.setState({ items: recievedData });
    console.log(this.state.items);
  };

  render() {
    return this.state.items ? (
      <>
        <div>
          <SearchAndFilter searchResult={this.searchResult} />
        </div>
        <div className='shop'>
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
      </>
    ) : (
      console.log('loading content')
    );
  }
}

export default ShopPage;
