import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Stripe from 'react-stripe-checkout';

import '../styles/Event.css';

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
    if(this.props.event) {
      return (
        <div>
          <div>EVENT { this.props.match.params.id }</div>
          <div>NAME { this.props.event.name }</div>
          <div>ARTIST { this.props.event.artist }</div>
          <div>PRICE { this.props.event.price }</div>
          <div>VENUENAME { this.props.event.venue }</div>
          <div>VENUEADDRESS { this.props.event.address }</div>
          <div>Date: { this.props.event.start.toDateString() }</div>
          <div>STARTTIME { this.props.event.start.toLocaleTimeString() }</div>
          <div>ENDTIME { this.props.event.end.toLocaleTimeString() }</div>
          <div>DESCRIPTION { this.props.event.description }</div>
          <Stripe
            label={'Reserve'}
            token={(token) => { this.onToken(token); }}
            stripeKey="pk_test_6pRNASCoBOKtIshFeQd4XMUh"
            currency="JPY"
            name="Live Jazz Co."
            image="../logo.png"
            description={`1 ticket for ${this.props.event.name}`}
            amount={2000}
          />
        </div>
      );
    } else {
      return <div />;
    }
  }
}

Event.propTypes = {
  event: PropTypes.shape(),
  match: PropTypes.shape().isRequired,
  onComponentDidMount: PropTypes.func,
  history: PropTypes.shape(),
  onReceiveChargeResponse: PropTypes.func,
};

Event.defaultProps = {
  event: undefined,
  history: undefined,
  onComponentDidMount: undefined,
  onReceiveChargeResponse: undefined,
};

export default Event;

