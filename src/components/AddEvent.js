import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DatePicker, TimePicker, TextField, RaisedButton } from 'material-ui';

import '../styles/AddEvent.css';

const DateTimeFormat = global.Intl.DateTimeFormat;

class AddEvent extends Component {
  constructor() {
    super();
    this.state = {
      addEventFields: {
        eventName: '',
        artistName: '',
        venueName: '',
        address: '',
        price: '',
        date: '',
        start: '',
        end: '',
      },
    };
  }

  setFormState(value, field) {
    const newState = {
      addEventFields: {
        ...this.state.addEventFields,
        [field]: value,
      },
    };
    this.setState({ ...newState });
  }

  validatePrice(value, oldval) {
    if ((value !== '' && ((isNaN(parseInt(value, 10)) ||
      isNaN(Number(value))) ||
      parseInt(value, 10) !== Number(value) ||
      parseInt(value, 10) < 0 ||
      parseInt(value, 10) === parseInt(oldval, 10)))) {
      return oldval;
    }
    return value;
  }

  render() {
    const { jwt, history, addEventResponse, userProfile, onFormSubmit } = this.props;
    const { addEventFields } = this.state;
    if (!jwt) history.push('/');
    const failed = !addEventResponse.addSuccess && addEventResponse.addSuccess !== undefined;

    return (
      <main id="add-event" className="flex column restrict-width grow">
        <TextField
          className="inputHalf name"
          floatingLabelText="Name"
          onChange={event => this.setFormState(event.target.value, 'eventName')}
        />
        <TextField
          className="inputHalf artist"
          floatingLabelText="Artist"
          onChange={event => this.setFormState(event.target.value, 'artistName')}
        />
        <TextField
          className="inputHalf venue"
          floatingLabelText="Venue"
          onChange={event => this.setFormState(event.target.value, 'venueName')}
        />
        <TextField
          className="inputFull address"
          floatingLabelText="Address"
          onChange={event => this.setFormState(event.target.value, 'address')}
        />
        <div className="colPriceDate">
          <TextField
            className="inputHalf price"
            floatingLabelText="Price"
            value={addEventFields.price}
            onChange={event => this.setFormState(this.validatePrice(event.target.value, this.state.addEventFields.price), 'price')}
          />
          <DatePicker
            className="inputHalf"
            floatingLabelText="Date"
            formatDate={new DateTimeFormat('en-US', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            }).format}
            onChange={(event, date) => this.setFormState(date, 'date')}
          />
        </div>
        <div className="colTime">
          <TimePicker
            className="inputHalf"
            floatingLabelText="Opening Time"
            okLabel="OK"
            cancelLabel="Cancel"
            onChange={(event, time) => this.setFormState(time, 'start')}
          />
          <TimePicker
            className="inputHalf"
            floatingLabelText="Closing Time"
            okLabel="OK"
            cancelLabel="Cancel"
            onChange={(event, time) => this.setFormState(time, 'end')}
          />
        </div>
        <RaisedButton
          primary
          className="mui-button"
          label="Submit"
          onClick={() =>
            onFormSubmit(addEventFields, userProfile.id, history)
          }
        />
        { failed ? <p>Submit failed!  Check data and try again.</p> : <div /> }
      </main>
    );
  }
}

AddEvent.propTypes = {
  jwt: PropTypes.string,
  userProfile: PropTypes.shape(),
  onFormSubmit: PropTypes.func.isRequired,
  addEventResponse: PropTypes.shape(),
  history: PropTypes.shape(),
};

AddEvent.defaultProps = {
  jwt: undefined,
  history: undefined,
  addEventResponse: {},
  userProfile: {},
};

export default AddEvent;
