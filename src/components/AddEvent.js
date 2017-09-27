import React from 'react';
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
    <main id="add-event" className="flex column restrict-width grow">
      <TextField
        className="inputHalf name"
        floatingLabelText="Name"
        onChange={props.onEventNameInput}
      />
      <TextField
        className="inputHalf artist"
        floatingLabelText="Artist"
        onChange={props.onArtistInput}
      />
      <TextField
        className="inputHalf venue"
        floatingLabelText="Venue"
        onChange={props.onVenueInput}
      />
      <TextField
        className="inputFull address"
        floatingLabelText="Address"
        onChange={props.onAddressInput}
      />
      <div className="colPriceDate">
        <TextField
          className="inputHalf price"
          floatingLabelText="Price"
          value={props.addEventFields.price}
          onChange={(event, val) =>
            props.onPriceInput(event, val, props.addEventFields.price)
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
          onChange={props.onDateInput}
        />
      </div>
      <div className="colTime">
        <TimePicker
          className="inputHalf"
          floatingLabelText="Opening Time"
          okLabel="OK"
          cancelLabel="Cancel"
          onChange={props.onStartTimeInput}
        />
        <TimePicker
          className="inputHalf"
          floatingLabelText="Closing Time"
          okLabel="OK"
          cancelLabel="Cancel"
          onChange={props.onEndTimeInput}
        />
      </div>
      <RaisedButton
        primary
        className="mui-button"
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
