import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

const DateTimeFormat = global.Intl.DateTimeFormat;

class AddEvent extends Component {
  render() {
    const failed = !this.props.addEventResponse.addSuccess
      && this.props.addEventResponse.addSuccess !== undefined;
    return (
      <div className="flex column restrict-width grow">
        <TextField
          className="name"
          floatingLabelText="Name"
          onChange={this.props.onEventNameInput}
        />
        <TextField
          className="venue"
          floatingLabelText="Venue"
          onChange={this.props.onVenueInput}
        />
        <TextField
          className="artist"
          floatingLabelText="Artist"
          onChange={this.props.onArtistInput}
        />
        <TextField
          className="address"
          floatingLabelText="Address"
          onChange={this.props.onAddressInput}
        />
        <TextField
          className="price"
          floatingLabelText="Price"
          value={this.props.addEventFields.price}
          onChange={(event, val) =>
            this.props.onPriceInput(event, val, this.props.addEventFields.price)
          }
        />
        <DatePicker
          floatingLabelText="Date"
          formatDate={new DateTimeFormat('en-US', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          }).format}
          onChange={this.props.onDateInput}
        />
        <TimePicker
          floatingLabelText="Opening Time"
          okLabel="OK"
          cancelLabel="Cancel"
          onChange={this.props.onStartTimeInput}
        />
        <TimePicker
          floatingLabelText="Closing Time"
          okLabel="OK"
          cancelLabel="Cancel"
          onChange={this.props.onEndTimeInput}
        />
        <RaisedButton
          label="Submit"
          onClick={event =>
            this.props.onFormSubmit(event, this.props.addEventFields, this.props.history)
          }
        />
        { failed ? <p>Submit failed!  Check data and try again.</p> : <div /> }
      </div>
    );
  }
}

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
