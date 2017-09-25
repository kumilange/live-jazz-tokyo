import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import '../styles/AddEvent.css';

const DateTimeFormat = global.Intl.DateTimeFormat;

const AddEvent = (props) => {
  const failed = !props.addEventResponse.addSuccess
    && props.addEventResponse.addSuccess !== undefined;
  return (
    <main className="flex column restrict-width grow">
      <TextField
        className="name"
        floatingLabelText="Name"
        onChange={props.onEventNameInput}
      />
      <TextField
        className="venue"
        floatingLabelText="Venue"
        onChange={props.onVenueInput}
      />
      <TextField
        className="artist"
        floatingLabelText="Artist"
        onChange={props.onArtistInput}
      />
      <TextField
        className="address"
        floatingLabelText="Address"
        onChange={props.onAddressInput}
      />
      <TextField
        className="price"
        floatingLabelText="Price"
        value={props.addEventFields.price}
        onChange={(event, val) =>
          props.onPriceInput(event, val, props.addEventFields.price)
        }
      />
      <DatePicker
        floatingLabelText="Date"
        formatDate={new DateTimeFormat('en-US', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        }).format}
        onChange={props.onDateInput}
      />
      <TimePicker
        floatingLabelText="Opening Time"
        okLabel="OK"
        cancelLabel="Cancel"
        onChange={props.onStartTimeInput}
      />
      <TimePicker
        floatingLabelText="Closing Time"
        okLabel="OK"
        cancelLabel="Cancel"
        onChange={props.onEndTimeInput}
      />
      <RaisedButton
        className="addSubmitBtn"
        label="Submit"
        onClick={event =>
          props.onFormSubmit(event, props.addEventFields, props.history)
        }
      />
      { failed ? <p>Submit failed!  Check data and try again.</p> : <div /> }
    </main>
  );
};

AddEvent.propTypes = {
  onFormSubmit: PropTypes.func.isRequired,
  onEventNameInput: PropTypes.func.isRequired,
  onArtistInput: PropTypes.func.isRequired,
  onVenueInput: PropTypes.func.isRequired,
  onAddressInput: PropTypes.func.isRequired,
  onPriceInput: PropTypes.func.isRequired,
  onDateInput: PropTypes.func.isRequired,
  onStartTimeInput: PropTypes.func.isRequired,
  onEndTimeInput: PropTypes.func.isRequired,
  addEventResponse: PropTypes.shape(),
  addEventFields: PropTypes.shape().isRequired,
  history: PropTypes.shape(),
};

AddEvent.defaultProps = {
  history: undefined,
  addEventResponse: {},
};

export default AddEvent;
