import React from 'react';
import PropTypes from 'prop-types';
import { InfoWindow } from 'react-google-maps';
import { Link } from 'react-router-dom';
import { Divider } from 'material-ui';

import { formatPrice, formatDate, formatTime } from '../utils/format';
import { CalendarIcon, ClockIcon, YenIcon, PinIcon, UserIcon, svgIconSize, svgIconSizeL } from '../styles/Icons';
import '../styles/InfoWindow.css';

const MyInfoWindow = ({ event, selectedEvent, onInfoWindowClose }) => (<div id="infowindow">
  { selectedEvent.id === event.id ?
    <InfoWindow
      className="infoWindow"
      onCloseClick={onInfoWindowClose}
    >
      <div className="infoWindowInner">
        <Link to={`/event/${event.id}`}>
          <h2 className="infoWindowHeading2">{event.name}</h2>
          <Divider style={{ marginTop: 10, marginBottom: 10 }} />
          <div className="flex vertCenter infoItemWrapper">
            <UserIcon style={svgIconSizeL} />
            <h3 className="infoWindowHeading3">{event.artist}</h3>
          </div>
          <div className="flex vertCenter infoItemWrapper">
            <PinIcon style={svgIconSize} />
            <p className="infoWindowSubTtl">{event.venue}</p>
          </div>
          <div className="flex">
            <div className="infoItemWrapper iconAdj">
              <div className="flex vertCenter">
                <CalendarIcon style={svgIconSize} />
                <p className="infoWindowSubTtl">{formatDate(event.start)}</p>
              </div>
            </div>
            <div className="infoItemWrapper">
              <div className="flex vertCenter">
                <ClockIcon style={svgIconSize} />
                <p className="infoWindowSubTtl">{formatTime(event.start)}-{formatTime(event.end)}
                </p>
              </div>
            </div>
          </div>
          <div className="flex vertCenter infoItemWrapper">
            <YenIcon style={svgIconSize} viewBox="4 4 19 19" />
            <p className="infoWindowSubTtl">{formatPrice(event.price)} </p>
          </div>
        </Link>
      </div>
    </InfoWindow>
    : null }
</div>);

MyInfoWindow.propTypes = {
  event: PropTypes.shape().isRequired,
  selectedEvent: PropTypes.shape().isRequired,
  onInfoWindowClose: PropTypes.func.isRequired,
};

export default MyInfoWindow;
