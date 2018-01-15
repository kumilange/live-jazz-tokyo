import React from 'react';
import PropTypes from 'prop-types';
import { InfoWindow } from 'react-google-maps';
import { Link } from 'react-router-dom';
import { Divider } from 'material-ui';

import { formatPrice, formatDate, formatTime } from '../utils/format';
import { CalendarIcon, ClockIcon, YenIcon, PinIcon, UserIcon, svgIconSize, svgIconSizeL } from '../styles/Icons';
import '../styles/InfoWindow.css';

const MyInfoWindow = ({ event: { id, name, artist, venue, start, end, price }, selectedEvent, clearSelectedEvent }) => (<div id="infowindow">
  { selectedEvent.id === id ?
    <InfoWindow
      className="infoWindow"
      onCloseClick={clearSelectedEvent}
    >
      <div className="infoWindowInner">
        <Link to={`/event/${id}`}>
          <h2 className="infoWindowHeading2">{name}</h2>
          <Divider style={{ marginTop: 10, marginBottom: 10 }} />
          <div className="flex vertCenter infoItemWrapper">
            <UserIcon style={svgIconSizeL} />
            <h3 className="infoWindowHeading3">{artist}</h3>
          </div>
          <div className="flex vertCenter infoItemWrapper">
            <PinIcon style={svgIconSize} />
            <p className="infoWindowSubTtl">{venue}</p>
          </div>
          <div className="flex">
            <div className="infoItemWrapper iconAdj">
              <div className="flex vertCenter">
                <CalendarIcon style={svgIconSize} />
                <p className="infoWindowSubTtl">{formatDate(start)}</p>
              </div>
            </div>
            <div className="infoItemWrapper">
              <div className="flex vertCenter">
                <ClockIcon style={svgIconSize} />
                <p className="infoWindowSubTtl">{formatTime(start)}-{formatTime(end)}
                </p>
              </div>
            </div>
          </div>
          <div className="flex vertCenter infoItemWrapper">
            <YenIcon style={svgIconSize} viewBox="4 4 19 19" />
            <p className="infoWindowSubTtl">{formatPrice(price)} </p>
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
