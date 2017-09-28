import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';

import EventMap from './EventMap';

import formatPrice from '../utils/format';
import '../styles/Event.css';
import { ClockIcon, YenIcon, PinIcon } from '../styles/Icons';

const fallbackDescription = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

class Event extends Component {
  componentDidMount() {
    this.props.onComponentDidMount(this.props.match.params.id);
  }

  render() {
    if (this.props.event) {
      return (
        <main className="restrict-width grow" id="event-details">
          <div className="image-box flex center">
            { this.props.event.image ?
              <img className="event-image" src={`data:image/png;base64,${this.props.event.image}`} alt="pic" /> :
              <img className="event-image" src="http://static.wixstatic.com/media/89bf03_01eeecd62c844653a4a50fcee305a7ea~mv2.jpg" alt="pic" /> }
          </div>

          <div className="row horiCenter">
            <div className="date flex column center">
              <p className="month">{this.props.event.start.toDateString().split(' ')[1]}</p>
              <p className="day">{this.props.event.start.getDate()}</p>
            </div>
            <h2 className="title flex center">{ this.props.event.name }</h2>
          </div>

          <Divider />

          <div className="event-details-table">
            <div className="flex vertCenter row">
              <div className="icon"><ClockIcon /></div>
              <p>{
                `${this.props.event.start.toTimeString().split(':').slice(0, 2).join(':')
                } to ${
                  this.props.event.end.toTimeString().split(':').slice(0, 2).join(':')}`}
              </p>
              <div className="grow" />
            </div>

            <div className="flex vertCenter row">
              <div className="icon"><PinIcon /></div>
              <p className="venue">
                <span>{ this.props.event.venue }：</span>
                <span>{ this.props.event.address }</span>
              </p>
              <div className="grow" />
              <div>
                <RaisedButton
                  className="mui-button"
                  label="View Map"
                  onClick={this.props.toggleMap}
                  style={{ width: '100px' }}
                />
              </div>
            </div>

            <div className={this.props.showMap ? 'map-container expanded' : 'map-container'}>
              <div className="event-map">
                <EventMap position={{ lat: this.props.event.lat, lng: this.props.event.lng }} />
              </div>
            </div>

            <div className="flex vertCenter row">
              <div className="icon"><YenIcon /></div>
              <p>{ formatPrice(this.props.event.price)} Yen</p>
              <div className="grow" />
              <Link to={'/pay'}>
                <RaisedButton
                  primary
                  className="mui-button"
                  label="Reserve"
                  style={{ width: '100px' }}
                />
              </Link>
            </div>
          </div>
          <Paper className="pane">
            <div className="block">
              <h3>Artist</h3>
            </div>
            <Divider />
            <div className="block">
              <p>{ this.props.event.artist }</p>
            </div>
          </Paper>
          <Paper className="pane">
            <div className="block">
              <h3>Details</h3>
            </div>
            <Divider />
            <div className="block">
              { this.props.event.description ?
                <div>{ this.props.event.description }</div> :
                <div>{ fallbackDescription }</div> }
            </div>
          </Paper>
        </main>
      );
    }
    return <div />;
  }
}

Event.propTypes = {
  event: PropTypes.shape(),
  match: PropTypes.shape().isRequired,
  onComponentDidMount: PropTypes.func,
  showMap: PropTypes.bool.isRequired,
  toggleMap: PropTypes.func.isRequired,
};

Event.defaultProps = {
  event: undefined,
  onComponentDidMount: undefined,
};

export default Event;

