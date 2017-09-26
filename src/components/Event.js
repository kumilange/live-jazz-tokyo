import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';

import EventMap from './EventMap';

import formatPrice from '../utils/format';
import '../styles/Event.css';
import { ClockIcon, DollarIcon, PinIcon } from '../styles/Icons';

class Event extends Component {
  componentDidMount() {
    this.props.onComponentDidMount(this.props.match.params.id);
  }

  async onToken(stripeToken) {
    const res = await (await fetch('/api/charge', {
      method: 'POST',
      body: JSON.stringify({
        stripeToken,
        eventID: this.props.match.params.id,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })).json();

    this.eject(res);
  }

  eject(res) {
    this.props.onReceiveChargeResponse(res);
    if (res.OK) {
      this.props.history.push('/confirmation');
    } else {
      window.alert('u dum u duum');
    }
  }

  render() {
    if (this.props.event) {
      return (
        <main className="restrict-width grow" id="event-details">
          <div className="image-box flex center">
            <img className="event-image" src={`data:image/png;base64,${this.props.event.image}`} alt="pic" />
          </div>

          <div className="row horiCenter">
            <div className="date flex column center">
              <p className="month">{this.props.event.start.toDateString().split(' ')[1]}</p>
              <p className="day">{this.props.event.start.getDate()}</p>
            </div>
            <h1 className="title flex center">{ this.props.event.name }</h1>
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
              <div className="icon"><DollarIcon /></div>
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
              <div>{ this.props.event.description }</div>
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
  history: PropTypes.shape(),
  showMap: PropTypes.bool.isRequired,
  toggleMap: PropTypes.func.isRequired,
  onReceiveChargeResponse: PropTypes.func,
};

Event.defaultProps = {
  userProfile: undefined,
  event: undefined,
  history: undefined,
  onComponentDidMount: undefined,
  onReceiveChargeResponse: undefined,
};

export default Event;

