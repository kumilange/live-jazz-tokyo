import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Event extends Component {
  componentWillMount() {
    const event = {
      name: 'SUMER JAZE LYFE PARTE',
      artist: 'SWAG MC G',
      price: 'ONE BILLION DOLLARS',
      venueName: 'JAZZ TOWN',
      venueAddress: '123 NEW ORLEANS AVE',
      startTime: '6pm',
      endTime: '9pm',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    };

    this.props.receivedEventDetails(event);
  }

  render() {
    return (
      <div>
        <div>EVENT { this.props.match.params.id }</div>
        <div>NAME { this.props.event.name }</div>
        <div>ARTIST { this.props.event.artist }</div>
        <div>PRICE { this.props.event.price }</div>
        <div>VENUENAME { this.props.event.venueName }</div>
        <div>VENUEADDRESS { this.props.event.venueAddress }</div>
        <div>STARTTIME { this.props.event.startTime }</div>
        <div>ENDTIME { this.props.event.endTime }</div>
        <div>DESCRIPTION { this.props.event.description }</div>
        <Link to={`/reserve/${this.props.match.params.id}`}>
          <button id="reserve" >Reserve</button>
        </Link>
      </div>
    );
  }
}

Event.propTypes = {
  event: PropTypes.shape().isRequired,
  match: PropTypes.shape().isRequired,
  receivedEventDetails: PropTypes.func.isRequired,
};

export default Event;

