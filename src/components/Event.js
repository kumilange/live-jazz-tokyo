import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Stripe from 'react-stripe-checkout';
import Divider from 'material-ui/Divider';

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
          <div className="image-box">
            <img className="event-image" src={`data:image/png;base64,${this.props.event.image}`} alt="pic" />
          </div>

          <div className="row">
            <div className="date flex column center">
              <p className="month">{this.props.event.start.toDateString().split(' ')[1]}</p>
              <p className="day">{this.props.event.start.getDate()}</p>
            </div>
            <h1 className="title flex center">{ this.props.event.name }</h1>
          </div>

          <Divider />

          <table className="event-details-table">
            <tbody>
              <tr>
                <td><ClockIcon /></td>
                <td>
                  <p>{ this.props.event.start.toDateString() }</p>
                  <p>{
                    `${this.props.event.start.toTimeString().split(':').slice(0, 2).join(':')
                    } to ${
                      this.props.event.end.toTimeString().split(':').slice(0, 2).join(':')}`}
                  </p>
                </td>
              </tr>
              <tr>
                <td><PinIcon /></td>
                <td className="flex center">
                  <div>
                    <p>{ this.props.event.venue }</p>
                    <p>{ this.props.event.address }</p>
                  </div>
                  <div className="grow" />
                  <div>
                    View Map
                  </div>
                </td>
              </tr>
              <tr>
                <td><DollarIcon /></td>
                <td className="flex center">
                  <p>{ `${this.props.event.price} Yen`}</p>
                  <div className="grow" />
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
                </td>
              </tr>
            </tbody>
          </table>


          <div>ARTIST { this.props.event.artist }</div>


          <div>DESCRIPTION { this.props.event.description }</div>
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
  onReceiveChargeResponse: PropTypes.func,
};

Event.defaultProps = {
  event: undefined,
  history: undefined,
  onComponentDidMount: undefined,
  onReceiveChargeResponse: undefined,
};

export default Event;

