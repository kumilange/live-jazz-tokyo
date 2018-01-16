import React from 'react';
import PropTypes from 'prop-types';
import { Marker } from 'react-google-maps';

import MyInfoWindow from '../InfoWindow';
import { MarkerIcon } from '../../atoms/Icon/Icon';

const MyMarkerList = ({ events, selectedEvent, setSelectedEvent, clearSelectedEvent }) => (
  <div id="markerList">
    {events.map((event) => {
      const { lat, lng, id, name } = event;
      const position = { lat, lng };
      return (<Marker
        position={position}
        key={id}
        title={name}
        icon={MarkerIcon}
        onClick={() => setSelectedEvent(event)}
      >
        <MyInfoWindow
          event={event}
          selectedEvent={selectedEvent}
          clearSelectedEvent={clearSelectedEvent}
        />
      </Marker>);
    })}
  </div>
);

MyMarkerList.propTypes = {
  events: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectedEvent: PropTypes.shape().isRequired,
  setSelectedEvent: PropTypes.func.isRequired,
  clearSelectedEvent: PropTypes.func.isRequired,
};

export default MyMarkerList;
