import React, { Component } from "react";
import axios from "axios";
import PlacesList from "./components/PlacesList";
import PlacesForm from "./components/PlacesForm";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";

import "./App.css";

const BASE_URL = "http://localhost:3001";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      view: "login",
      currentUser: null,
      token: "",
      loggedIn: false,
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

    this.onPlacesChange = this.onPlacesChange.bind(this);
    this.onPlacesSubmit = this.onPlacesSubmit.bind(this);
    this.onLoginSubmit = this.onLoginSubmit.bind(this);
    this.onSignupSubmit = this.onSignupSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }

  onPlacesChange(ev) {
    const { name, value } = ev.target;

    this.setState(prevState => ({
      formData: {
        ...prevState.formData,
        [name]: value
      }
    }));
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

  onPlacesSubmit(ev) {
    ev.preventDefault();
    this.savePlace(this.state.formData);
  }

  onChange(ev) {
    const { name, value } = ev.target;

    this.setState(prevState => ({
      userData: {
        ...prevState.userData,
        [name]: value
      }
    }));
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
          username: "",
          password: ""
        }
      });
    }
  }

  onSignupSubmit(ev) {
    ev.preventDefault();
    this.saveUser(this.state.userData);
  }

  buildHeaders() {
    const { token } = this.state;
    return {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    };
  }
  async getCurrentUser() {
    try {
      const headers = this.buildHeaders();
      const resp = await axios.get(`${BASE_URL}/currentuser`, {...headers});
      console.log(resp.data);
      console.log(resp.data.user);
      // this.fetchSodas();
      this.setState({
        loggedIn: true,
        currentUser: resp.data.user
      });
    } catch(e) {
      console.log(e);
    }
  }
  validateLogin() {
    const { username, password } = this.state.userData;
    console.log(username, password);
    axios.post(`${BASE_URL}/users/login`, { username, password }).then(resp =>
      this.setState({
        token: resp.data.token,
        loggedIn: true,
        view: "places"
      })
    );
  }
  onLoginSubmit(ev) {
    ev.preventDefault();
    this.validateLogin();
  }
  async onDelete(id) {
    try {
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

  setView(view) {
    this.setState({
      view: view
    });
  }
  getView() {
    const { name, description, visited, address } = this.state.formData;
    const { username, password } = this.state.userData;
    switch (this.state.view) {
      case "login":
        return (
          <LoginForm
            setView={this.setView}
            username={username}
            password={password}
            onChange={this.onChange}
            onSubmit={this.onLoginSubmit}
          />
        );
      case "signup":
        return (
          <SignupForm
            setView={this.setView}
            username={username}
            password={password}
            onChange={this.onChange}
            onSubmit={this.onSignupSubmit}
          />
        );
      case "addPlaces":
        return (
          <PlacesForm
            setView={this.setView}
            name={name}
            description={description}
            visited={visited}
            address={address}
            onCheckBox={this.handleCheckBox}
            onChange={this.onPlacesChange}
            onSubmit={this.onPlacesSubmit}
          />
        );
      case "places":
        return (
          <PlacesList
            setView={this.setView}
            onDelete={this.onDelete}
            places={this.state.places}
          />
        );
      default:
    }
  }
  render() {
    return (
      <main>
        <div className="App">{this.getView()}</div>
      </main>
    );
  }
}

export default App;
