import { connect } from 'react-redux';
import AddEvent from '../components/AddEvent';

import { addNewEvent } from '../actions';

const mapStateToProps = state => ({
  jwt: state.user.jwt,
  userProfile: state.user.userProfile,
  addEventResponse: state.event.addEventResponse,
  addEventFields: state.event.addEventFields,
});

const mapDispatchToProps = dispatch => ({
  onFormSubmit: (addEventFields, userId, history) => {
    dispatch(addNewEvent(addEventFields, userId, history));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(AddEvent);
