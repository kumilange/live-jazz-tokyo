import React from 'react';
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';

import MyMarkerList from './MyMarkerList';
import fancyMapStyles from '../resources/fancyMapStyles.json';
import { UserLocationIcon } from '../styles/Icons';
import '../styles/InfoWindow.css';

const DEFAULT_CENTER = { lat: 35.6857933, lng: 139.7501793 };

const MyMap = withGoogleMap(({ userLocation, events, selectedEvent, onMarkerClick, onInfoWindowClose }) => (<GoogleMap
  defaultZoom={13}
  defaultCenter={DEFAULT_CENTER}
  defaultOptions={{
    streetViewControl: false,
    fullscreenControl: false,
    mapTypeControl: false,
    styles: fancyMapStyles,
  }}
  center={userLocation.lat === undefined ? DEFAULT_CENTER : userLocation}
>
  <div className="mapLable">On Tonight</div>
  <MyMarkerList
    events={events}
    selectedEvent={selectedEvent}
    onMarkerClick={onMarkerClick}
    onInfoWindowClose={onInfoWindowClose}
  />
  {userLocation.lat ?
    <Marker
      position={userLocation}
      icon={UserLocationIcon}
    /> : null}
</GoogleMap>));

export default MyMap;
