import React from 'react';
import { InfoWindow, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import { Link } from 'react-router-dom';
import { Divider } from 'material-ui';

import { formatPrice, formatDate, formatTime } from '../utils/format';
import fancyMapStyles from '../resources/fancyMapStyles.json';
import { CalendarIcon, ClockIcon, YenIcon, PinIcon, UserIcon, MarkerIcon, UserLocationIcon } from '../styles/Icons';
import '../styles/InfoWindow.css';

const DEFAULT_CENTER = { lat: 35.6857933, lng: 139.7501793 };

const MyMap = withGoogleMap((props) => {
  return (<GoogleMap
    defaultZoom={13}
    defaultCenter={DEFAULT_CENTER}
    defaultOptions={{
      streetViewControl: false,
      fullscreenControl: false,
      mapTypeControl: false,
      styles: fancyMapStyles,
    }}
    center={props.userLocation.lat === undefined ? DEFAULT_CENTER : props.userLocation}
  >
    <div className="mapLable">On Tonight</div>
    {
      props.events.map((event) => {
        const position = {
          lat: event.lat,
          lng: event.lng,
        };
        const svgIconSizeL = { width: '25px', height: '20px' };
        const svgIconSize = { width: '25px', height: '16px' };
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
                  <Divider style={{ marginTop: 10, marginBottom: 10 }} />
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
                        <p className="infoWindowSubTtl">{ formatDate(event.start) }</p>
                      </div>
                    </div>
                    <div className="infoItemWrapper">
                      <div className="flex vertCenter">
                        <ClockIcon style={svgIconSize} />
                        <p className="infoWindowSubTtl">{ formatTime(event.start) }-{ formatTime(event.end) }
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex vertCenter infoItemWrapper">
                    <YenIcon style={svgIconSize} viewBox="4 4 19 19" />
                    <p className="infoWindowSubTtl">{ formatPrice(event.price) } </p>
                  </div>
                </Link>
              </div>
            </InfoWindow>
            : null }
        </Marker>);
      })
    }
    { props.userLocation.lat ?
      <Marker
        position={props.userLocation}
        icon={UserLocationIcon}
      /> : null }
  </GoogleMap>
  );
});

export default MyMap;
