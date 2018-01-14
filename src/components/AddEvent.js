import React from 'react';
import PropTypes from 'prop-types';
import { DatePicker, TimePicker, TextField, RaisedButton } from 'material-ui';

import '../styles/AddEvent.css';

const DateTimeFormat = global.Intl.DateTimeFormat;

const AddEvent = ({ jwt, history, addEventResponse, userProfile, onFormSubmit, onEventNameInput, onArtistInput, onVenueInput, onAddressInput, onPriceInput, onDateInput, onStartTimeInput, onEndTimeInput, addEventFields }) => {
  if (!jwt) history.push('/');
  const failed = !addEventResponse.addSuccess
    && addEventResponse.addSuccess !== undefined;
  return (
    <main id="add-event" className="flex column restrict-width grow">
      <TextField
        className="inputHalf name"
        floatingLabelText="Name"
        onChange={onEventNameInput}
      />
      <TextField
        className="inputHalf artist"
        floatingLabelText="Artist"
        onChange={onArtistInput}
      />
      <TextField
        className="inputHalf venue"
        floatingLabelText="Venue"
        onChange={onVenueInput}
      />
      <TextField
        className="inputFull address"
        floatingLabelText="Address"
        onChange={onAddressInput}
      />
      <div className="colPriceDate">
        <TextField
          className="inputHalf price"
          floatingLabelText="Price"
          value={addEventFields.price}
          onChange={(event, val) =>
            onPriceInput(event, val, addEventFields.price)
          }
        />
        <DatePicker
          className="inputHalf"
          floatingLabelText="Date"
          formatDate={new DateTimeFormat('en-US', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          }).format}
          onChange={onDateInput}
        />
      </div>
      <div className="colTime">
        <TimePicker
          className="inputHalf"
          floatingLabelText="Opening Time"
          okLabel="OK"
          cancelLabel="Cancel"
          onChange={onStartTimeInput}
        />
        <TimePicker
          className="inputHalf"
          floatingLabelText="Closing Time"
          okLabel="OK"
          cancelLabel="Cancel"
          onChange={onEndTimeInput}
        />
      </div>
      <RaisedButton
        primary
        className="mui-button"
        label="Submit"
        onClick={event =>
          onFormSubmit(event, addEventFields, userProfile.id, history)
        }
      />
      { failed ? <p>Submit failed!  Check data and try again.</p> : <div /> }
    </main>
  );
};

AddEvent.propTypes = {
  jwt: PropTypes.string,
  userProfile: PropTypes.shape(),
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
  jwt: undefined,
  history: undefined,
  addEventResponse: {},
  userProfile: {},
};

export default AddEvent;
