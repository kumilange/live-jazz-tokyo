import { connect } from 'react-redux';
import AddEvent from '../components/AddEvent';

import {
  addNewEvent,
  setEventNameField,
  setArtistField,
  setVenueField,
  setAddressField,
  setPriceField,
  setStartTimeField,
  setEndTimeField
} from '../actions';

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
  onStartTimeInput: (event) => {
    dispatch(setStartTimeField(event));
  },
  onEndTimeInput: (event) => {
    dispatch(setEndTimeField(event));
  },
  onFormSubmit: (event) => {
    dispatch(addNewEvent(event));
  },
});

export default connect(null, mapDispatchToProps)(AddEvent);
