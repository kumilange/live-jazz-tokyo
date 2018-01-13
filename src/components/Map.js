import React, { Component } from 'react';
import PropTypes from 'prop-types';

import MyMap from './MyMap';
import '../styles/InfoWindow.css';

class Map extends Component {
  componentDidMount() {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser');
      return;
    }
    navigator.geolocation.getCurrentPosition((position) => {
      this.props.onReceivedUserLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    });
  }

  render() {
    const { events, selectedEvent, userLocation, onMarkerClick, onInfoWindowClose } = this.props;
    return process.env.npm_lifecycle_event === 'test'
      ? <div />
      : <MyMap
        events={events}
        selectedEvent={selectedEvent}
        onMarkerClick={onMarkerClick}
        onInfoWindowClose={onInfoWindowClose}
        userLocation={userLocation}
        containerElement={<div style={{ height: '100%' }} />}
        mapElement={<div style={{ height: '100%' }} />}
      />;
  }
}

Map.propTypes = {
  events: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectedEvent: PropTypes.shape().isRequired,
  userLocation: PropTypes.shape().isRequired,
  onMarkerClick: PropTypes.func.isRequired,
  onInfoWindowClose: PropTypes.func.isRequired,
  onReceivedUserLocation: PropTypes.func.isRequired,
};

export default Map;
