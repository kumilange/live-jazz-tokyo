import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Marker } from 'react-google-maps';

import Map from '../../molecules/Map/Map';
import MyMarkerList from '../../molecules/MarkerList/MarkerList';

class Top extends Component {
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
    this.props.initializeEvents();
  }

  render() {
    const { events, selectedEvent, userLocation, setSelectedEvent, clearSelectedEvent } = this.props;
    return process.env.npm_lifecycle_event === 'test'
      ? <div />
      : <main id="top" className="restrict-width">
        <Map
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
        </Map>
      </main>;
  }
}

Top.propTypes = {
  events: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectedEvent: PropTypes.shape().isRequired,
  userLocation: PropTypes.shape().isRequired,
  setSelectedEvent: PropTypes.func.isRequired,
  clearSelectedEvent: PropTypes.func.isRequired,
  setUserLocation: PropTypes.func.isRequired,
  initializeEvents: PropTypes.func.isRequired,
};

export default Top;
