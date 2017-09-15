import React, { Component } from 'react';
import { withGoogleMap, GoogleMap } from 'react-google-maps';

const MyMap = withGoogleMap(() => (
  <GoogleMap
    defaultZoom={4}
    defaultCenter={{ lat: 25.7392, lng: -104.9903 }}
  />
));

class Map extends Component {
  render() {
    return process.env.npm_lifecycle_event === 'test' ? <div /> : <MyMap
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

export default Map;
