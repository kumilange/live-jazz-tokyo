import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Marker } from 'react-google-maps';

import Map from '../Map';
import { MarkerIcon } from '../../atoms/Icon/Icon';

class EventMap extends Component {
  render() {
    const { position } = this.props;
    return process.env.npm_lifecycle_event === 'test'
      ? <div />
      : <Map
        position={position}
        containerElement={<div style={{ height: '100%' }} />}
        mapElement={<div style={{ height: '100%' }} />}
      >
        <Marker position={position} icon={MarkerIcon} />
      </Map>;
  }
}

EventMap.propTypes = {
  position: PropTypes.shape().isRequired,
};

export default EventMap;
