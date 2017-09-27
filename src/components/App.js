import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Map from '../containers/Map';

class App extends Component {
  componentDidMount() {
    this.props.initializeEvents();
  }

  render() {
    return (
      <main id="app" className="restrict-width">
        <div className="toast">On Tonight</div>
        <Map />
      </main>
    );
  }
}

App.propTypes = {
  initializeEvents: PropTypes.func.isRequired,
};

export default App;

