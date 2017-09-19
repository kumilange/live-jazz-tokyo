import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Event extends Component {
  componentDidMount() {
    this.props.onComponentDidMount(this.props.match.params.id);
  }

  render() {
    return (
      <div>
        <div>EVENT { this.props.match.params.id }</div>
        <div>NAME { this.props.event.name }</div>
        <div>ARTIST { this.props.event.artist }</div>
        <div>PRICE { this.props.event.price }</div>
        <div>VENUENAME { this.props.event.venue }</div>
        <div>VENUEADDRESS { this.props.event.address }</div>
        <div>STARTTIME { this.props.event.start }</div>
        <div>ENDTIME { this.props.event.end }</div>
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
  onComponentDidMount: PropTypes.func.isRequired,
};

export default Event;

