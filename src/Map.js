import React, { Component } from 'react';
import { InfoWindow, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import PropTypes from 'prop-types';

const MyMap = withGoogleMap(props => {
  const DAY_IN_MILLISECONDS = 86400000
  const now = Date.now();
  let currentEvents = props.props.events.filter(event => {
    return event.end > now && event.start < now + DAY_IN_MILLISECONDS;
  })
  return (<GoogleMap
    defaultZoom={14}
    defaultCenter={{ lat: 35.6857933, lng: 139.7501793 }}
  >
    {
      currentEvents.map( (event) => {
        const position = {
          lat: event.lat,
          lng: event.lng,
        };
        return <Marker
          position={position}
          key={String(position.lat) + String(position.lng)}
          title={event.event}
          onClick={ () => props.props.onMarkerClick(event)}
        >
        </Marker>
      })
    }
  </GoogleMap>
)});

class Map extends Component {
  render() {
    return process.env.npm_lifecycle_event === 'test' ? <div /> : <MyMap
      props={this.props}
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
  onMarkerClick: PropTypes.func.isRequired,
};

export default Map;
