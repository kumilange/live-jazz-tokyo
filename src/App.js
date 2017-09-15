import React, { Component } from 'react';
import Map from './Map';
import './App.css';
import data from './data/events.json';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Map markers={data} />
      </div>
    );
  }
}

export default App;
