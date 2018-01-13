import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Marker } from 'react-google-maps';

import MyMap from './MyMap';
import MyMarkerList from './MyMarkerList';

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
    const commonProps = { events, selectedEvent, onMarkerClick, onInfoWindowClose };

    return process.env.npm_lifecycle_event === 'test'
      ? <div />
      : <MyMap
        {...commonProps}
        position={userLocation}
        containerElement={<div style={{ height: '100%' }} />}
        mapElement={<div style={{ height: '100%' }} />}
      >
        <div className="mapLable">On Tonight</div>
        <MyMarkerList
          {...commonProps}
        />
        {userLocation.lat ?
          <Marker
            position={userLocation}
            icon={userLocation}
          /> : null}
      </MyMap>;
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
