import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Map from '../../../containers/organisms/Map';
import './App.css';

class App extends Component {
  componentDidMount() {
    this.props.initializeEvents();
  }

  render() {
    return (
      <main id="app" className="restrict-width">
        <Map />
      </main>
    );
  }
}

App.propTypes = {
  initializeEvents: PropTypes.func.isRequired,
};

export default App;

