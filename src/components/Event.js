import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Event extends Component {
  render() {
    return (
      <div>
        EVENT
      </div>
    );
  }
}

Event.propTypes = {
  description: PropTypes.string.isRequired,
};

export default Event;

