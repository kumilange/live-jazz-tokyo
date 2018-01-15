import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Divider, Paper, RaisedButton } from 'material-ui';

import EventMap from './EventMap';
import { formatPrice, formatMonthOrDate, formatTime } from '../utils/format';
import '../styles/Event.css';
import { ClockIcon, YenIcon, PinIcon } from '../styles/Icons';

const FALLBACK_DESC = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

class Event extends Component {
  componentDidMount() {
    this.props.getEventDetails(this.props.match.params.id);
  }

  render() {
    const { event, toggleMap, showMap } = this.props;
    if (!event) return null;
    return (
      <main className="restrict-width grow" id="event-details">
        <div className="image-box flex center">
          { event.image ?
            <img className="event-image" src={`data:image/png;base64,${event.image}`} alt="pic" /> :
            <img className="event-image" src="http://static.wixstatic.com/media/89bf03_01eeecd62c844653a4a50fcee305a7ea~mv2.jpg" alt="pic" /> }
        </div>
        <div className="row horiCenter">
          <div className="date flex column center">
            <p className="month">{ formatMonthOrDate(event.start, true) }</p>
            <p className="day">{ formatMonthOrDate(event.start, false) }</p>
          </div>
          <h2 className="title flex center">{ event.name }</h2>
        </div>
        <Divider />
        <div className="event-details-table">
          <div className="flex vertCenter row">
            <div className="icon"><ClockIcon /></div>
            <p>
              {`${formatTime(event.start)} to ${formatTime(event.end)}`}
            </p>
            <div className="grow" />
          </div>
          <div className="flex vertCenter row">
            <div className="icon"><PinIcon /></div>
            <p className="venue">
              <span>{ event.venue }：</span>
              <span>{ event.address }</span>
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
              <EventMap position={{ lat: event.lat, lng: event.lng }} />
            </div>
          </div>
          <div className="flex vertCenter row">
            <div className="icon"><YenIcon /></div>
            <p>{ formatPrice(event.price)}</p>
            <div className="grow" />
            { this.props.jwt ?
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
            <h3>Artist</h3>
          </div>
          <Divider />
          <div className="block">
            <p>{ event.artist }</p>
          </div>
        </Paper>
        <Paper className="pane">
          <div className="block">
            <h3>Details</h3>
          </div>
          <Divider />
          <div className="block">
            { event.desc ?
              <div>{ event.desc }</div> :
              <div>{ FALLBACK_DESC }</div> }
          </div>
        </Paper>
      </main>
    );
  }
}

Event.propTypes = {
  event: PropTypes.shape(),
  match: PropTypes.shape().isRequired,
  getEventDetails: PropTypes.func.isRequired,
  showMap: PropTypes.bool.isRequired,
  toggleMap: PropTypes.func.isRequired,
  jwt: PropTypes.string,
};

Event.defaultProps = {
  event: undefined,
  jwt: undefined,
};

export default Event;

