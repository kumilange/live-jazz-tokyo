import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Marker } from 'react-google-maps';

import MyMap from '../../molecules/MyMap/MyMap';
import MyMarkerList from '../../molecules/MarkerList/MarkerList';

class Map extends Component {
  componentDidMount() {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser');
      return;
    }
    navigator.geolocation.getCurrentPosition((position) => {
      this.props.setUserLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    });
  }

  render() {
    const { events, selectedEvent, userLocation, setSelectedEvent, clearSelectedEvent } = this.props;
    return process.env.npm_lifecycle_event === 'test'
      ? <div />
      : <MyMap
        position={userLocation}
        containerElement={<div style={{ height: '100%' }} />}
        mapElement={<div style={{ height: '100%' }} />}
      >
        <div className="mapLable">On Tonight</div>
        <MyMarkerList
          events={events}
          selectedEvent={selectedEvent}
          setSelectedEvent={setSelectedEvent}
          clearSelectedEvent={clearSelectedEvent}
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
  setSelectedEvent: PropTypes.func.isRequired,
  clearSelectedEvent: PropTypes.func.isRequired,
  setUserLocation: PropTypes.func.isRequired,
};

export default Map;
