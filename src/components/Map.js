import React, { Component } from 'react';
import { InfoWindow, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import PropTypes from 'prop-types';

const MyMap = withGoogleMap((props) => {
  const NUMBER_OF_MILLISECONDS_IN_ONE_DAY = 86400000;
  const now = Date.now();
  const currentEvents = props.events.filter((event) => {
    return event.end > now && event.start < now + NUMBER_OF_MILLISECONDS_IN_ONE_DAY;
  });
  return (<GoogleMap
    defaultZoom={14}
    defaultCenter={{ lat: 35.6857933, lng: 139.7501793 }}
  >
    {
      currentEvents.map((event) => {
        const position = {
          lat: event.lat,
          lng: event.lng,
        };
        return (<Marker
          position={position}
          key={event.id}
          title={event.event}
          onClick={() => props.onMarkerClick(event)}
        >
          { props.selectedEvent === event ?
            <InfoWindow>
              <div>
                <h2>{ event.event }</h2>
                <h3>{ event.artist }</h3>
                <p>{ event.venue }</p>
                <p>¥{ event.price }</p>
                <p>{ (new Date(event.start)).getMonth() + 1 } /
                  { (new Date(event.start)).getDate() } </p>
                <p>{ (new Date(event.start)).getHours() } ~ { (new Date(event.end)).getHours() }</p>
              </div>
            </InfoWindow>
            : null }
        </Marker>);
      })
    }
  </GoogleMap>
  );
});

class Map extends Component {
  render() {
    return process.env.npm_lifecycle_event === 'test' ? <div /> : <MyMap
      events={this.props.events}
      selectedEvent={this.props.selectedEvent}
      onMarkerClick={this.props.onMarkerClick}
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
  selectedEvent: PropTypes.shape().isRequired,
  onMarkerClick: PropTypes.func.isRequired,
};

export default Map;
