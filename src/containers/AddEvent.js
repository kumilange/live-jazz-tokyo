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
  userProfile: state.userProfile,
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
    if (!(value !== '' && ((isNaN(parseInt(value, 10)) ||
      isNaN(Number(value))) ||
      parseInt(value, 10) !== Number(value) ||
      parseInt(value, 10) < 0 ||
      parseInt(value, 10) === parseInt(oldval, 10)))) {
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
  onFormSubmit: (event, addEventFields, userId, history) => {
    dispatch(addNewEvent(addEventFields, userId, history));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(AddEvent);
