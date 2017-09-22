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
  onPriceInput: (event) => {
    dispatch(setPriceField(event));
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
    dispatch(addNewEvent(addEventFields, history));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(AddEvent);
