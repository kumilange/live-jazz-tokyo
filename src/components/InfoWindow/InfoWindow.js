import React from 'react';
import PropTypes from 'prop-types';
import { InfoWindow } from 'react-google-maps';
import { Link } from 'react-router-dom';
import { Divider } from 'material-ui';

import { formatPrice, formatDate, formatTime } from '../../utils/format';
import { CalendarIcon, ClockIcon, YenIcon, PinIcon, UserIcon, svgIconSize, svgIconSizeL } from '../Icon/Icon';
import './InfoWindow.css';

const MyInfoWindow = ({ event: { id, name, artist, venue, start, end, price }, selectedEvent, clearSelectedEvent }) => (<div id="infowindow">
  { selectedEvent.id === id ?
    <InfoWindow
      className="infoWindow"
      onCloseClick={clearSelectedEvent}
    >
      <div className="info-window-inner">
        <Link to={`/event/${id}`}>
          <h2 className="info-window-heading2">{name}</h2>
          <Divider style={{ marginTop: 10, marginBottom: 10 }} />
          <div className="flex vertCenter info-item-wrapper">
            <UserIcon style={svgIconSizeL} />
            <h3 className="info-window-heading3">{artist}</h3>
          </div>
          <div className="flex vertCenter info-item-wrapper">
            <PinIcon style={svgIconSize} />
            <p className="info-window-subttl">{venue}</p>
          </div>
          <div className="flex">
            <div className="info-item-wrapper icon-adjust">
              <div className="flex vertCenter">
                <CalendarIcon style={svgIconSize} />
                <p className="info-window-subttl">{formatDate(start)}</p>
              </div>
            </div>
            <div className="info-item-wrapper">
              <div className="flex vertCenter">
                <ClockIcon style={svgIconSize} />
                <p className="info-window-subttl">{formatTime(start)}-{formatTime(end)}
                </p>
              </div>
            </div>
          </div>
          <div className="flex vertCenter info-item-wrapper">
            <YenIcon style={svgIconSize} viewBox="4 4 19 19" />
            <p className="info-window-subttl">{formatPrice(price)} </p>
          </div>
        </Link>
      </div>
    </InfoWindow>
    : null }
</div>);

MyInfoWindow.propTypes = {
  event: PropTypes.shape().isRequired,
  selectedEvent: PropTypes.shape().isRequired,
  clearSelectedEvent: PropTypes.func.isRequired,
};

export default MyInfoWindow;
