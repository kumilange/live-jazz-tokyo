import React from 'react';
import PropTypes from 'prop-types';
import { InfoWindow } from 'react-google-maps';
import { Link } from 'react-router-dom';
import { Divider } from 'material-ui';

import { formatPrice, formatDate, formatTime } from '../utils/format';
import { CalendarIcon, ClockIcon, YenIcon, PinIcon, UserIcon } from '../styles/Icons';
import '../styles/InfoWindow.css';

const svgIconSizeL = { width: '25px', height: '20px' };
const svgIconSize = { width: '25px', height: '16px' };

const MyInfoWindow = props => (
  <div id="infowindow">
    { props.selectedEvent === props.event ?
      <InfoWindow
        className="infoWindow"
        onCloseClick={props.onInfoWindowClose}
      >
        <div className="infoWindowInner">
          <Link to={`/event/${props.event.id}`}>
            <h2 className="infoWindowHeading2">{props.event.name}</h2>
            <Divider style={{ marginTop: 10, marginBottom: 10 }} />
            <div className="flex vertCenter infoItemWrapper">
              <UserIcon style={svgIconSizeL} />
              <h3 className="infoWindowHeading3">{props.event.artist}</h3>
            </div>
            <div className="flex vertCenter infoItemWrapper">
              <PinIcon style={svgIconSize} />
              <p className="infoWindowSubTtl">{props.event.venue}</p>
            </div>
            <div className="flex">
              <div className="infoItemWrapper iconAdj">
                <div className="flex vertCenter">
                  <CalendarIcon style={svgIconSize} />
                  <p className="infoWindowSubTtl">{formatDate(props.event.start)}</p>
                </div>
              </div>
              <div className="infoItemWrapper">
                <div className="flex vertCenter">
                  <ClockIcon style={svgIconSize} />
                  <p className="infoWindowSubTtl">{formatTime(props.event.start)}-{formatTime(props.event.end)}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex vertCenter infoItemWrapper">
              <YenIcon style={svgIconSize} viewBox="4 4 19 19" />
              <p className="infoWindowSubTtl">{formatPrice(props.event.price)} </p>
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
