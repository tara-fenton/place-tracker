import React, { Component } from "react";
import axios from "axios";
import PlacesList from "./components/PlacesList";
import PlacesForm from "./components/PlacesForm";
import UserForm from "./components/UserForm";

import "./App.css";

const BASE_URL = "http://localhost:3001";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      places: [],
      formData: {
        name: "",
        description: "",
        visited: true,
        address: ""
      },
      users: [],
      userData: {
        username: "",
        password: ""
      }
    };

    this.handlePlacesChange = this.handlePlacesChange.bind(this);
    this.handlePlacesSubmit = this.handlePlacesSubmit.bind(this);
    this.handleUserChange = this.handleUserChange.bind(this);
    this.handleUserSubmit = this.handleUserSubmit.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }

  handleUserChange(ev) {
    const { name, value } = ev.target;

    this.setState(prevState => ({
      userData: {
        ...prevState.userData,
        [name]: value
      }
    }));
  }
  handlePlacesChange(ev) {
    const { name, value } = ev.target;
    if (name === "visited") {
      this.setState(prevState => ({
        formData: {
          ...prevState.formData,
          [name]: !!value
        }
      }));
      console.log("special case for checkbox");
    }
    console.log(name, value);
    this.setState(prevState => ({
      formData: {
        ...prevState.formData,
        [name]: value
      }
    }));
  }
  handleCheckBox(e) {
    console.log(e.target);
  }
  async savePlace(place) {
    try {
      const resp = await axios.post(`${BASE_URL}/places`, place);
      this.setState(prevState => ({
        places: [...prevState.places, resp.data]
      }));
    } catch (e) {
      console.log(e);
    } finally {
      this.setState({
        formData: {
          name: "",
          description: "",
          visited: true,
          address: ""
        }
      });
    }
  }

  handlePlacesSubmit(ev) {
    ev.preventDefault();
    this.savePlace(this.state.formData);
  }

  async saveUser(user) {
    try {
      const resp = await axios.post(`${BASE_URL}/users`, user);
      this.setState(prevState => ({
        users: [...prevState.users, resp.data]
      }));
    } catch (e) {
      console.log(e);
    } finally {
      this.setState({
        userData: {
          name: "",
          description: ""
        }
      });
    }
  }

  handleUserSubmit(ev) {
    ev.preventDefault();
    this.saveUser(this.state.userData);
  }

  // onAxiosCall function(delete, (`${BASE_URL}/places/${id}`))
  // add loading component
  //const resp = await axios.delete(`${BASE_URL}/places/${id}`);
  //remove the loading componet

  async onDelete(id) {
    try {
      // onAxiosCall
      await axios.delete(`${BASE_URL}/places/${id}`);
      this.setState(prevState => ({
        places: prevState.places.filter(place => place.id !== id)
      }));
    } catch (e) {
      console.log("oopsie: ", e.message);
    }
  }

  async fetchPlaces() {
    const resp = await axios.get(`${BASE_URL}/places`);
    this.setState({ places: resp.data });
    return resp.data;
  }

  async componentDidMount() {
    await this.fetchPlaces();
  }

  render() {
    const { name, description, visited, address } = this.state.formData;
    const { username, password } = this.state.userData;
    return (
      <div className="App">
        <main>
          <PlacesList onDelete={this.onDelete} places={this.state.places} />
          <PlacesForm
            name={name}
            description={description}
            visited={visited}
            address={address}
            onCheckBox={this.handleCheckBox}
            onChange={this.handlePlacesChange}
            onSubmit={this.handlePlacesSubmit}
          />
          <UserForm
            username={username}
            password={password}
            onChange={this.handleUserChange}
            onSubmit={this.handleUserSubmit}
          />
        </main>
      </div>
    );
  }
}

export default App;
