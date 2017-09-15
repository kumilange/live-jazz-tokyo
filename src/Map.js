import React, { Component } from 'react';
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import PropTypes from 'prop-types';

const MyMap = withGoogleMap(props =>(
  <GoogleMap
    defaultZoom={11}
    defaultCenter={{ lat: 35.652832, lng: 139.839478 }}
    onClick={props.onMapClick}
  >
    {props.markers.map(marker => (
      <Marker
        {...marker}
      />
    ))}
  </GoogleMap>
));

class Map extends Component {
  render() {
    return process.env.npm_lifecycle_event === 'test' ? <div /> : <MyMap
      markers= { this.props.markers }
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
  markers: PropTypes.array.isRequired
};

export default Map;
