import React, { Component } from 'react';
import axios from 'axios';
import PlacesList from './components/PlacesList';

import './App.css';

const BASE_URL = 'http://localhost:3001';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      places: []
    };

    this.onDelete = this.onDelete.bind(this);
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
    return (
      <div className="App">
        <main>
          <PlacesList
            onDelete={this.onDelete}
            places={this.state.places} />

        </main>
      </div>
    );
  }
}

export default App;
