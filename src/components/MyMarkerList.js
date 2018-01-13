import React from 'react';
import PropTypes from 'prop-types';
import { Marker } from 'react-google-maps';

import MyInfoWindow from './MyInfoWindow';
import { MarkerIcon } from '../styles/Icons';
import '../styles/InfoWindow.css';

const MyMarkerList = props => (
  <div id="markerList">
    {props.events.map((event) => {
      const position = {
        lat: event.lat,
        lng: event.lng,
      };
      return (<Marker
        position={position}
        key={event.id}
        title={event.event}
        icon={MarkerIcon}
        onClick={() => props.onMarkerClick(event)}
      >
        <MyInfoWindow
          event={event}
          selectedEvent={props.selectedEvent}
          onInfoWindowClose={props.onInfoWindowClose}
        />
      </Marker>);
    })}
  </div>
);

MyMarkerList.propTypes = {
  events: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectedEvent: PropTypes.shape().isRequired,
  onInfoWindowClose: PropTypes.func.isRequired,
};

export default MyMarkerList;
