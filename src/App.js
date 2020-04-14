import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import AddCar from './components/add-car.component';
import Car from './components/car.component';
import CarList from './components/car-list.component';

export default class App extends Component {

  state = {
    title: 'No Cars!'
  };

  /**
   * Fetches/sets header subtitle from 
   * the server via HTTP GET request.
   */
  getTitle = () => {
    fetch('/api')
      .then(response => response.json())
      .then(response => {
        console.log(`This is the response: ${JSON.stringify(response)}`);
        this.setState(() => ({
          title: response.title
        }));
      })
      .catch((error) => {
        console.log(`There was an error getting app title: ${JSON.stringify(error)}`);
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
    this.getTitle();
  }

  render() {
    return (
      <Router>
        <div>
          <nav className="navbar navbar-expand navbar-dark bg-dark">
            <a href="/cars" className="navbar-brand">
              {this.state.title}
            </a>
            <div className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to={"/cars"} className="nav-link">
                  Cars
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/add"} className="nav-link">
                  Add
                </Link>
              </li>         
            </div>
          </nav>

          <div className="container mt-3">
            <Switch>
              <Route exact path={["/", "/cars"]} component={CarList} />
              <Route exact path="/add" component={AddCar} />
              <Route exact path="/cars/:id" component={Car} />
            </Switch>
          </div>
        </div>
      </Router>
    )
  }
}
