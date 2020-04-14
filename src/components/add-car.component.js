import React, { Component } from "react";
import CarDataService from "../services/car.service";

export default class AddCarl extends Component {
  state = {
    id: null,
    name: '',
    model: '',
    notes: '',
    available: false,
    submitted: false
  };

  // Name input handler
  onChangeName = (e) => {
    this.setState({
      name: e.target.value
    });
  };

  onChangeModel = (e) => {
    this.setState({
      model: e.target.value
    });
  };

  onChangeNotes = (e) => {
    this.setState({
      notes: e.target.value
    });
  };

  saveCar = () => {
    const data = {
      name: this.state.name,
      model: this.state.model,
      notes: this.state.notes
    };

    CarDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          name: response.data.name,
          model: response.data.model,
          notes: response.data.notes,
          available: response.data.available,

          submitted: true
        });
      })
      .catch((e) => {
        console.log('There was a problem adding a car: ', e);
      });
  }

  newCar = () => {
    this.setState({
      id: null,
      name: '',
      model: '',
      notes: '',
      available: false,
      submitted: false
    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newCar}>
              Add
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                required
                value={this.state.name}
                onChange={this.onChangeName}
                name="name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="model">Model</label>
              <input
                type="text"
                className="form-control"
                id="model"
                required
                value={this.state.model}
                onChange={this.onChangeModel}
                name="model"
              />
            </div>

            <div className="form-group">
              <label htmlFor="notes">Notes</label>
              <input
                type="text"
                className="form-control"
                id="notes"
                required
                value={this.state.notes}
                onChange={this.onChangeNotes}
                name="notes"
              />
            </div>

            <button onClick={this.saveCar} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}