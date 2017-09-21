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
    this.props.onReceiveChargeResponse(res.message);
    if (res.OK) {
      this.props.history.push('/confirmation');
    } else {
      window.alert('u dum u duum');
    }
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
  }
}

Event.propTypes = {
  event: PropTypes.shape().isRequired,
  match: PropTypes.shape().isRequired,
  onComponentDidMount: PropTypes.func.isRequired,
  history: PropTypes.shape(),
  onReceiveChargeResponse: PropTypes.func.isRequired,
};

Event.defaultProps = {
  history: undefined,
};

export default Event;

