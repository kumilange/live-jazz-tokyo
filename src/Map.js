import React, { Component } from 'react';
import { InfoWindow, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import PropTypes from 'prop-types';

class MyMarker extends Component {
  render() {
    const position = {
      lat: this.props.event.lat,
      lng: this.props.event.lng,
    };
    return <Marker
      position={position}
      key={String(position.lat) + String(position.lng)}
      title={this.props.event.event}
    >
    </Marker>
  }
}

const MyMap = withGoogleMap(props => {
  const DAY_IN_MILLISECONDS = 86400000
  const now = Date.now();
  let currentEvents = props.events.filter(event => {
    return event.end > now && event.start < now + DAY_IN_MILLISECONDS;
  })
  return (<GoogleMap
    defaultZoom={14}
    defaultCenter={{ lat: 35.6857933, lng: 139.7501793 }}
  >
    {
      currentEvents.map( (event) => {
        return <MyMarker event={ event } />
      })
    }
  </GoogleMap>
)});

class Map extends Component {
  render() {
    return process.env.npm_lifecycle_event === 'test' ? <div /> : <MyMap
      events={this.props.events}
      className="test"
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
};

export default Map;
