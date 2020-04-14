import React, { Component } from "react";
import CarDataService from "../services/car.service";

export default class Car extends Component {
  state = {
    currentCar: {
      id: null,
      name: '',
      model: '',
      notes: '',
      available: false
    },
    message: ''
  };

  componentDidMount() {
    this.getCar(this.props.match.params.id)
  };

  onChangeName = (e) => {
    const name = e.target.value;

    this.setState(function(prevState) {
      return {
        currentCar: {
          ...prevState.currentCar,
          name: name
        }
      };
    });
  };

  onChangeModel = (e) => {
    const model = e.target.value;

    this.setState(function(prevState) {
      return {
        currentCar: {
          ...prevState.currentCar,
          model: model
        }
      };
    });
  };

  onChangeNotes = (e) => {
    const notes = e.target.value;

    this.setState(function(prevState) {
      return {
        currentCar: {
          ...prevState.currentCar,
          notes: notes
        }
      };
    });
  };

  getTutorial = (id) => {
    CarDataService.get(id)
      .then(response => {
        this.setState({
          currentCar: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  updateAvailable = (status) => {
    var data = {
      id: this.state.currentCar.id,
      name: this.state.currentCar.name,
      model: this.state.currentCar.model,
      notes: this.state.currentCar.notes,
      available: status
    };

    CarDataService.update(this.state.currentCar.id, data)
      .then(response => {
        this.setState(prevState => ({
          currentCar: {
            ...prevState.currentCar,
            available: status
          }
        }));
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  updateCar = () => {
    CarDataService.update(
      this.state.currentCar.id,
      this.state.currentCar
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The car was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteCar = () => {    
    CarDataService.delete(this.state.currentCar.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/cars')
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentCar } = this.state;

    return (
      <div>
        {currentCar ? (
          <div className="edit-form">
            <h4>Car</h4>
            <form>
              <div className="form-group">
                <label htmlFor="title">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  value={currentCar.name}
                  onChange={this.onChangeName}
                />
              </div>
              <div className="form-group">
                <label htmlFor="model">Model</label>
                <input
                  type="text"
                  className="form-control"
                  id="model"
                  value={currentCar.model}
                  onChange={this.onChangeModel}
                />
              </div>
              <div className="form-group">
                <label htmlFor="notes">Notes</label>
                <input
                  type="text"
                  className="form-control"
                  id="notes"
                  value={currentCar.notes}
                  onChange={this.onChangeNotes}
                />
              </div>

              <div className="form-group">
                <label>
                  <strong>Status:</strong>
                </label>
                {currentCar.available ? "Available" : "Pending"}
              </div>
            </form>

            {currentCar.available ? (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updateAvailable(false)}
              >
                Unavailable
              </button>
            ) : (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updateAvailable(true)}
              >
                Available
              </button>
            )}

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteCar}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateCar}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Car...</p>
          </div>
        )}
      </div>
    );
  }
}