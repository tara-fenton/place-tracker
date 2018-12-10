import React, { Component } from 'react';
import axios from 'axios';
import PlacesList from './components/PlacesList';
import PlacesForm from './components/PlacesForm';

import './App.css';

const BASE_URL = 'http://localhost:3001';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      places: [],
      formData: {
        name: '',
        description: '',
        visited: true,
        address: ''
      }
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }

  handleChange(ev) {
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
        places: [
          ...prevState.places,
          resp.data
        ]
      }));
    } catch(e) {
      console.log(e);
    } finally {
      this.setState({
        formData: {
          name: '',
          description: '',
          visited: true,
          address: ''
        }
      });
    }
  }

  handleSubmit(ev) {
    ev.preventDefault();
    this.savePlace(this.state.formData);
  }

  async onDelete(id) {
    try {
      const resp = await axios.delete(`${BASE_URL}/places/${id}`);
      this.setState(prevState => ({
        places: prevState.places.filter(place => place.id !== id)
      }));
    } catch(e) {
      console.log('oopsie: ', e.message);
    }

  }

  async fetchPlaces() {
    const resp = await axios.get(`${BASE_URL}/places`);
    this.setState({ places: resp.data })
    return resp.data;
  }

  async componentDidMount() {
    const places = await this.fetchPlaces();
  }

  render() {
    const { name, description, visited, address } = this.state.formData;
    return (
      <div className="App">
        <main>
          <PlacesList
            onDelete={this.onDelete}
            places={this.state.places} />
          <PlacesForm
            name={name}
            description={description}
            visited={visited}
            address={address}
            onChange={this.handleChange}
            onSubmit={this.handleSubmit} />

        </main>
      </div>
    );
  }
}

export default App;
