import React from 'react';
import PropTypes from 'prop-types';
import { Marker } from 'react-google-maps';

import Map from '../../molecules/Map';
import MyMarkerList from '../../molecules/MarkerList';
import { isObjectEmpty } from '../../../utils';
import './Top.css';

const Top = ({ events, selectedEvent, userLocation, setSelectedEvent, clearSelectedEvent }) => {
  return process.env.npm_lifecycle_event === 'test'
    ? <div />
    : <main id="top" className="restrict-width">
      <Map
        position={userLocation}
        containerElement={<div style={{ height: '100%' }} />}
        mapElement={<div style={{ height: '100%' }} />}
      >
        <div className="map-lable">On Tonight</div>
        <MyMarkerList
          events={events}
          selectedEvent={selectedEvent}
          setSelectedEvent={setSelectedEvent}
          clearSelectedEvent={clearSelectedEvent}
        />
        {!isObjectEmpty(userLocation) ?
          <Marker
            position={userLocation}
            icon={userLocation}
          /> : null}
      </Map>
    </main>;
};

Top.propTypes = {
  events: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectedEvent: PropTypes.shape().isRequired,
  userLocation: PropTypes.shape().isRequired,
  setSelectedEvent: PropTypes.func.isRequired,
  clearSelectedEvent: PropTypes.func.isRequired,
};

export default Top;
