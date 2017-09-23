import React, { Component } from 'react';
import { InfoWindow, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import canUseDOM from 'can-use-dom';

import fancyMapStyles from '../resources/fancyMapStyles.json';

const DEFAULT_CENTER = { lat: 35.6857933, lng: 139.7501793 };

const geolocation = (
  canUseDOM && navigator.geolocation ?
    navigator.geolocation :
    ({
      getCurrentPosition(success, failure) {
        failure('Your browser doesn\'t support geolocation.');
      },
    })
);

const MyMap = withGoogleMap((props) => {
  return (<GoogleMap
    defaultZoom={14}
    defaultCenter={DEFAULT_CENTER}
    defaultOptions={{ styles: fancyMapStyles }}
    center={props.userLocation.lat === undefined ? DEFAULT_CENTER : props.userLocation}
  >
    {
      props.events.map((event) => {
        const position = {
          lat: event.lat,
          lng: event.lng,
        };
        return (<Marker
          position={position}
          key={event.id}
          title={event.event}
          onClick={() => props.onMarkerClick(event)}
        >
          { props.selectedEvent === event ?
            <InfoWindow
              onCloseClick={props.onInfoWindowClose}
            >
              <div>
                <Link to={`/event/${event.id}`}>
                  <h2>{ event.name }</h2>
                </Link>
                <h3>{ event.artist }</h3>
                <p>{ event.venue }</p>
                <p>¥{ event.price }</p>
                <p>{ (new Date(event.start)).toDateString().split(' ').slice(1, 3).join('. ') }</p>
                <p>{
                  `${(new Date(event.start)).toTimeString().split(':').slice(0, 2).join(':')} ~ ${
                    (new Date(event.end)).toTimeString().split(':').slice(0, 2).join(':')}`}
                </p>
              </div>
            </InfoWindow>
            : null }
        </Marker>);
      })
    }
  </GoogleMap>
  );
});

class Map extends Component {
  componentWillMount() {
    geolocation.getCurrentPosition((position) => {
      this.props.onReceivedUserLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    });
  }

  render() {
    return process.env.npm_lifecycle_event === 'test' ? <div /> : <MyMap
      events={this.props.events}
      selectedEvent={this.props.selectedEvent}
      onMarkerClick={this.props.onMarkerClick}
      onInfoWindowClose={this.props.onInfoWindowClose}
      userLocation={this.props.userLocation}
      containerElement={
        <div style={{ height: '100%' }} />
      }
      mapElement={
        <div style={{ height: '100%' }} />
      }
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
