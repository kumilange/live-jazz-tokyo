import React, { Component } from 'react';
import { InfoWindow, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import fancyMapStyles from '../resources/fancyMapStyles.json';
import { MarkerIcon } from '../styles/Icons';
import '../styles/InfoWindow.css';

const DEFAULT_CENTER = { lat: 35.6857933, lng: 139.7501793 };

const MyMap = withGoogleMap((props) => {
  console.log(props)
  return (<GoogleMap
    defaultZoom={14}
    defaultCenter={DEFAULT_CENTER}
    defaultOptions={{
      streetViewControl: false,
      fullscreenControl: false,
      mapTypeControl: false,
      styles: fancyMapStyles
    }}
    center={ props.position === undefined ? DEFAULT_CENTER : props.position }
  >
    <Marker
      position={ props.position }
      icon={ MarkerIcon }
      onClick={() => props.onMarkerClick(props.event)}
    >
      <InfoWindow
        className="infoWindow"
        onCloseClick={props.onInfoWindowClose}
      >
        <div>HI</div>
      </InfoWindow>
    </Marker>);
  </GoogleMap>
  );
});

class Map extends Component {

  render() {
    return process.env.npm_lifecycle_event === 'test' ? <div /> : <MyMap
      position={ this.props.position }
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
};

export default Map;
