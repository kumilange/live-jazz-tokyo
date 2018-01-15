import { connect } from 'react-redux';
import AddEvent from '../components/AddEvent';

import { addNewEvent } from '../actions';

const mapStateToProps = state => ({
  jwt: state.jwt,
  userProfile: state.userProfile,
  addEventResponse: state.addEventResponse,
  addEventFields: state.addEventFields,
});

const mapDispatchToProps = dispatch => ({
  onFormSubmit: (addEventFields, userId, history) => {
    dispatch(addNewEvent(addEventFields, userId, history));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(AddEvent);
