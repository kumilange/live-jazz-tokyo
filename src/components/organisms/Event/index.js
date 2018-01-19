import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Divider, Paper, RaisedButton } from 'material-ui';

import EventMap from '../../molecules/EventMap';
import Loader from '../../atoms/Loader';
import { formatPrice, formatMonthOrDate, formatTime, isObjectEmpty } from '../../../utils';
import './Event.css';
import { ClockIcon, YenIcon, PinIcon, UserIcon } from '../../atoms/Icon/Icon';

const FALLBACK_DESC = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

const Event = ({ eventDetails, jwt, isFetching, toggleMap, showMap }) => {
  if (isFetching) return <Loader />;
  if (isObjectEmpty(eventDetails)) return null;
  return (
    <main className="restrict-width grow" id="event-details">
      <div className="image-box flex center">
        { eventDetails.image ?
          <img className="event-image" src={`data:image/png;base64,${eventDetails.image}`} alt="pic" /> :
          <img className="event-image" src="http://static.wixstatic.com/media/89bf03_01eeecd62c844653a4a50fcee305a7ea~mv2.jpg" alt="pic" /> }
      </div>
      <div className="row horiCenter">
        <div className="date flex column center">
          <p className="month">{ formatMonthOrDate(eventDetails.start, true) }</p>
          <p className="day">{ formatMonthOrDate(eventDetails.start, false) }</p>
        </div>
        <h2 className="title flex center">{ eventDetails.name }</h2>
      </div>
      <Divider />
      <div className="event-details-table">
        <div className="flex vertCenter row">
          <div className="artist flex">
            <div className="icon"><UserIcon /></div>
            <p>{eventDetails.artist}</p>
          </div>
          <div className="time flex">
            <div className="icon"><ClockIcon /></div>
            <p>
              {`${formatTime(eventDetails.start)} to ${formatTime(eventDetails.end)}`}
            </p>
          </div>
        </div>
        <div className="flex vertCenter row">
          <div className="icon"><PinIcon /></div>
          <p className="venue">
            <span>{ eventDetails.venue }：</span>
            <span>{ eventDetails.address }</span>
          </p>
          <div className="grow" />
          <div>
            <RaisedButton
              className="mui-button"
              label="View Map"
              onClick={toggleMap}
              style={{ width: '100px' }}
            />
          </div>
        </div>
        <div className={showMap ? 'map-container expanded' : 'map-container'}>
          <div className="event-map">
            <EventMap position={{ lat: eventDetails.lat, lng: eventDetails.lng }} />
          </div>
        </div>
        <div className="flex vertCenter row">
          <div className="icon"><YenIcon /></div>
          <p>{ formatPrice(eventDetails.price)}</p>
          <div className="grow" />
          { jwt ?
            <Link to={'/pay'}>
              <RaisedButton
                primary
                className="mui-button"
                label="Reserve"
                style={{ width: '100px' }}
              />
            </Link>
            : null }
        </div>
      </div>
      <Paper className="pane">
        <div className="block">
          <h3>Details</h3>
        </div>
        <Divider />
        <div className="block">
          { eventDetails.desc ?
            <div>{ eventDetails.desc }</div> :
            <div>{ FALLBACK_DESC }</div> }
        </div>
      </Paper>
    </main>
  );
};

Event.propTypes = {
  eventDetails: PropTypes.shape().isRequired,
  jwt: PropTypes.string.isRequired,
  isFetching: PropTypes.bool.isRequired,
  showMap: PropTypes.bool.isRequired,
  toggleMap: PropTypes.func.isRequired,
};

export default Event;
