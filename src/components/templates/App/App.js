import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Top from '../../../containers/organisms/Top';
import './App.css';

class App extends Component {
  componentDidMount() {
    this.props.initializeEvents();
  }

  render() {
    return (
      <main id="app" className="restrict-width">
        <Top />
      </main>
    );
  }
}

App.propTypes = {
  initializeEvents: PropTypes.func.isRequired,
};

export default App;

