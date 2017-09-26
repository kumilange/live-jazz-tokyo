import React, { Component } from 'react';
import { InfoWindow, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import canUseDOM from 'can-use-dom';

import fancyMapStyles from '../resources/fancyMapStyles.json';
import { CalendarIcon, ClockIcon, DollarIcon, PinIcon, UserIcon, MarkerIcon } from '../styles/Icons';
import '../styles/InfoWindow.css';

const DEFAULT_CENTER = { lat: 35.6857933, lng: 139.7501793 };

const geolocation = (
  canUseDOM && navigator.geolocation ?
    navigator.geolocation :
    ({
      getCurrentPosition(success, failure) {
        failure('Your browser doesn\'t support geolocation.');
      },
    })
);

const formatPrice = (price) => {
  return price.toString().replace(/(\d)(?=(\d{3})+$)/g, '$1,');
};

const MyMap = withGoogleMap((props) => {
  return (<GoogleMap
    defaultZoom={14}
    defaultCenter={DEFAULT_CENTER}
    defaultOptions={{
      streetViewControl: false,
      fullscreenControl: false,
      mapTypeControl: false,
      styles: fancyMapStyles,
    }}
    center={props.userLocation.lat === undefined ? DEFAULT_CENTER : props.userLocation}
  >
    {
      props.events.map((event) => {
        const position = {
          lat: event.lat,
          lng: event.lng,
        };
        const svgIconSizeL = { width: '20px', height: '20px' };
        const svgIconSize = { width: '16px', height: '16px' };
        return (<Marker
          position={position}
          key={event.id}
          title={event.event}
          icon={MarkerIcon}
          onClick={() => props.onMarkerClick(event)}
        >
          { props.selectedEvent === event ?
            <InfoWindow
              className="infoWindow"
              onCloseClick={props.onInfoWindowClose}
            >
              <div className="infoWindowInner">
                <Link to={`/event/${event.id}`}>
                  <h2 className="infoWindowHeading2">{ event.name }</h2>
                  <div className="flex vertCenter infoItemWrapper">
                    <UserIcon style={svgIconSizeL} />
                    <h3 className="infoWindowHeading3">{ event.artist }</h3>
                  </div>
                  <div className="flex vertCenter infoItemWrapper">
                    <PinIcon style={svgIconSize} />
                    <p className="infoWindowSubTtl">{ event.venue }</p>
                  </div>
                  <div className="flex">
                    <div className="infoItemWrapper iconAdj">
                      <div className="flex vertCenter">
                        <CalendarIcon style={svgIconSize} />
                        <p className="infoWindowSubTtl">{ (new Date(event.start)).toDateString().split(' ').slice(1, 3)
                          .join('. ') }</p>
                      </div>
                    </div>
                    <div className="infoItemWrapper">
                      <div className="flex vertCenter">
                        <ClockIcon style={svgIconSize} />
                        <p className="infoWindowSubTtl">{
                          `${(new Date(event.start)).toTimeString().split(':').slice(0, 2)
                            .join(':')} ~ ${
                            (new Date(event.end)).toTimeString().split(':').slice(0, 2)
                              .join(':')}`}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex vertCenter infoItemWrapper">
                    {/* TODO change the icon to YEN */}
                    <DollarIcon style={svgIconSize} />
                    <p className="infoWindowSubTtl">{ formatPrice(event.price) }yen</p>
                  </div>
                </Link>
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
  componentWillMount() {
    geolocation.getCurrentPosition((position) => {
      this.props.onReceivedUserLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    });
  }

  render() {
    return process.env.npm_lifecycle_event === 'test' ? <div /> : <MyMap
      events={this.props.events}
      selectedEvent={this.props.selectedEvent}
      onMarkerClick={this.props.onMarkerClick}
      onInfoWindowClose={this.props.onInfoWindowClose}
      userLocation={this.props.userLocation}
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
  userLocation: PropTypes.shape().isRequired,
  onMarkerClick: PropTypes.func.isRequired,
  onInfoWindowClose: PropTypes.func.isRequired,
  onReceivedUserLocation: PropTypes.func.isRequired,
};

export default Map;
