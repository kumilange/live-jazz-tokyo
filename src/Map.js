import React, { Component } from 'react';
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import PropTypes from 'prop-types';

const MyMap = withGoogleMap(props => (
  <GoogleMap
    defaultZoom={14}
    defaultCenter={{ lat: 35.6857933, lng: 139.7501793 }}
    onClick={props.onMapClick}
  >
    {props.markers.map((marker) => {
      const position = {
        lat: marker.lat,
        lng: marker.lng,
      };
      return (<Marker
        position={position}
        key={position.lat + position.lng}
        title={marker.event}
      />);
    })}
  </GoogleMap>
));

class Map extends Component {
  render() {
    return process.env.npm_lifecycle_event === 'test' ? <div /> : <MyMap
      markers={this.props.markers}
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
  markers: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Map;
