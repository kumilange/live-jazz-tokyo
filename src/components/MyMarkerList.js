import React from 'react';
import PropTypes from 'prop-types';
import { Marker } from 'react-google-maps';

import MyInfoWindow from './MyInfoWindow';
import { MarkerIcon } from '../styles/Icons';
import '../styles/InfoWindow.css';

const MyMarkerList = ({ events, selectedEvent, onMarkerClick, onInfoWindowClose }) => (
  <div id="markerList">
    {events.map((event) => {
      const position = {
        lat: event.lat,
        lng: event.lng,
      };
      return (<Marker
        position={position}
        key={event.id}
        title={event.event}
        icon={MarkerIcon}
        onClick={() => onMarkerClick(event)}
      >
        <MyInfoWindow
          event={event}
          selectedEvent={selectedEvent}
          onInfoWindowClose={onInfoWindowClose}
        />
      </Marker>);
    })}
  </div>
);

MyMarkerList.propTypes = {
  events: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectedEvent: PropTypes.shape().isRequired,
  onMarkerClick: PropTypes.func.isRequired,
  onInfoWindowClose: PropTypes.func.isRequired,
};

export default MyMarkerList;
