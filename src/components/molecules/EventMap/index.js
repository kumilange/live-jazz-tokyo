import React from 'react';
import PropTypes from 'prop-types';
import { Marker } from 'react-google-maps';

import Map from '../Map';
import { MarkerIcon } from '../../atoms/Icon/Icon';

const EventMap = ({ position }) => (process.env.npm_lifecycle_event === 'test'
  ? <div />
  : <Map
    position={position}
    containerElement={<div style={{ height: '100%' }} />}
    mapElement={<div style={{ height: '100%' }} />}
  >
    <Marker position={position} icon={MarkerIcon} />
  </Map>);

EventMap.propTypes = {
  position: PropTypes.shape().isRequired,
};

export default EventMap;
