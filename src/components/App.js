import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Map from '../containers/Map';

class App extends Component {
  componentDidMount() {
    this.props.initializeEvents();
  }

  render() {
    return (
      <div className="App">
        <Map />
      </div>
    );
  }
}

App.propTypes = {
  initializeEvents: PropTypes.func.isRequired,
};

export default App;

