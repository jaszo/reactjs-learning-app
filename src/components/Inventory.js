import React from 'react';
// import axios from 'axios';

import config from '../config/config.json';

export default class Inventory extends React.Component {
  state = {
    error: undefined
  };

  /*
   * Perform a get request for retrieving
   * the car inventory.
   */
  getInventory = () => {
    // @TODO research if using axios
    /*
      axios({
        method: 'get',
        url: '/search',
        baseUrl: config.baseUrl,
        responseType: 'json'
      }).then((response) => {
        console.log(`Car inventory: ${JSON.stringify(response)}`);
      }).catch((err) => {
        console.log(err);
        const error = `There was an error getting the car inventory ${JSON.stringify(err)}`;
        this.setState(() => ({ error }));
      });
     */
  };

  componentDidMount() {
    // Call server to reach data 
    // from the server
    this.getInventory();
  }

  render() {
    return (
      <div>
        {this.state.error && <p>{this.state.error}</p>}
        <div className="widget-header">
          <p>Display car inventory here!</p>
        </div>
      </div>
    )
  }
}