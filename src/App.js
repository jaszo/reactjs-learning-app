import React from 'react';
import Header from './components/Header';
import Inventory from './components/Inventory';
// import axios from 'axios';

import './App.css';

export default class App extends React.Component {
  state = {
    subtitle: 'No cars in the inventory!',
    cars: []
  };

  /**
   * Fetches/sets header subtitle from 
   * the server via HTTP GET request.
   */
  getHeaderSubtitle = () => {
    fetch('/api')
      .then(response => response.json())
      .then(response => {
        console.log(`This is the response: ${JSON.stringify(response)}`);
        this.setState(() => ({
          subtitle: response.subtitle
        }));
      })
      .catch((error) => {
        console.log(`There was an error getting car inventory: ${JSON.stringify(error)}`);
      });
    
    // @TODO research if using axios
    /*
      axios({
        method: 'get',
        url: config.baseUrl,
        responseType: 'text',
        headers: {
          'Access-Control-Allow-Credentials': true
        }
      }).then((response) => {
        console.log(`This is the response: ${response}`);
        this.setState({
          subtitle: response
        })
      }).catch((error) => {
        console.log(`There was an error getting car inventory: ${JSON.stringify(error)}`);
      });
     */
  };

  /**
   * Lifecycle from React JS before 
   * rendering the component.
   */
  componentDidMount() {
    // Get the header subtitle
    // from the server.
    this.getHeaderSubtitle();
  }

  render() {
    return (
      <div>
        <Header subtitle={this.state.subtitle} />
        <div className="container">
          <div className="widget">
            <Inventory />
          </div>
        </div>
      </div>
    );
  }
}
