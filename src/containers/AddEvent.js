import { connect } from 'react-redux';
import AddEvent from '../components/AddEvent';

import {
  addNewEvent,
  setEventNameField,
  setArtistField,
  setVenueField,
  setAddressField,
  setPriceField,
  setDateField,
  setStartTimeField,
  setEndTimeField,
} from '../actions';

const mapStateToProps = state => ({
  jwt: state.jwt,
  addEventResponse: state.addEventResponse,
  addEventFields: state.addEventFields,
});

const mapDispatchToProps = dispatch => ({
  onEventNameInput: (event) => {
    dispatch(setEventNameField(event));
  },
  onArtistInput: (event) => {
    dispatch(setArtistField(event));
  },
  onVenueInput: (event) => {
    dispatch(setVenueField(event));
  },
  onAddressInput: (event) => {
    dispatch(setAddressField(event));
  },
  onPriceInput: (event, value, oldval) => {
    if (value !== '' && ((isNaN(parseInt(value, 10)) || isNaN(Number(value))) ||
      parseInt(value, 10) !== Number(value) ||
      parseInt(value, 10) < 0 ||
      parseInt(value, 10) === parseInt(oldval, 10))) {
      event.preventDefault();
    } else {
      dispatch(setPriceField(value));
    }
  },
  onDateInput: (event, date) => {
    dispatch(setDateField(date));
  },
  onStartTimeInput: (event, time) => {
    dispatch(setStartTimeField(time));
  },
  onEndTimeInput: (event, time) => {
    dispatch(setEndTimeField(time));
  },
  onFormSubmit: (event, addEventFields, history) => {
    event.preventDefault();
    addEventFields.start.setDate(addEventFields.date.getDate());
    addEventFields.start.setMonth(addEventFields.date.getMonth());
    addEventFields.start.setYear(addEventFields.date.getFullYear());
    addEventFields.end.setDate(addEventFields.date.getDate());
    addEventFields.end.setMonth(addEventFields.date.getMonth());
    addEventFields.end.setYear(addEventFields.date.getFullYear());
    dispatch(addNewEvent(addEventFields, history));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(AddEvent);
