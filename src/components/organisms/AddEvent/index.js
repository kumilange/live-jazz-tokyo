import React from 'react';
import PropTypes from 'prop-types';
import { DatePicker, TimePicker, TextField, RaisedButton } from 'material-ui';

import './AddEvent.css';

const DateTimeFormat = global.Intl.DateTimeFormat;

const AddEvent = (props) => {
  const { history, jwt, userProfile, addEventResponse, addEventFields, addNewEvent, setFormState, validatePrice } = props;
  if (!jwt) history.push('/');
  const failed = !addEventResponse.addSuccess && addEventResponse.addSuccess !== undefined;

  return (
    <main id="add-event" className="flex column restrict-width grow">
      <TextField
        className="inputHalf name"
        floatingLabelText="Name"
        onChange={event => setFormState(event.target.value, 'eventName')}
      />
      <TextField
        className="inputHalf artist"
        floatingLabelText="Artist"
        onChange={event => setFormState(event.target.value, 'artistName')}
      />
      <TextField
        className="inputHalf venue"
        floatingLabelText="Venue"
        onChange={event => setFormState(event.target.value, 'venueName')}
      />
      <TextField
        className="inputFull address"
        floatingLabelText="Address"
        onChange={event => setFormState(event.target.value, 'address')}
      />
      <div className="col-price-date">
        <TextField
          className="inputHalf price"
          floatingLabelText="Price"
          value={addEventFields.price}
          onChange={event => setFormState(validatePrice(event.target.value, addEventFields.price), 'price')}
        />
        <DatePicker
          className="inputHalf"
          floatingLabelText="Date"
          formatDate={new DateTimeFormat('en-US', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          }).format}
          onChange={(event, date) => setFormState(date, 'date')}
        />
      </div>
      <div className="col-time">
        <TimePicker
          className="inputHalf"
          floatingLabelText="Opening Time"
          okLabel="OK"
          cancelLabel="Cancel"
          onChange={(event, time) => setFormState(time, 'start')}
        />
        <TimePicker
          className="inputHalf"
          floatingLabelText="Closing Time"
          okLabel="OK"
          cancelLabel="Cancel"
          onChange={(event, time) => setFormState(time, 'end')}
        />
      </div>
      <RaisedButton
        primary
        className="mui-button"
        label="Submit"
        style={{ marginTop: '40px' }}
        onClick={() => addNewEvent(addEventFields, userProfile.id, history)}
      />
      { failed ? <p>Submit failed!  Check data and try again.</p> : <div /> }
    </main>
  );
};

AddEvent.propTypes = {
  jwt: PropTypes.string.isRequired,
  history: PropTypes.shape().isRequired,
  userProfile: PropTypes.shape().isRequired,
  addEventFields: PropTypes.shape().isRequired,
  addEventResponse: PropTypes.shape().isRequired,
  addNewEvent: PropTypes.func.isRequired,
  setFormState: PropTypes.func.isRequired,
  validatePrice: PropTypes.func.isRequired,
};

export default AddEvent;
