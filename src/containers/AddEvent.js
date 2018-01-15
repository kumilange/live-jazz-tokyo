import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { addNewEvent } from '../actions';
import AddEvent from '../components/AddEvent';


const mapStateToProps = state => ({
  jwt: state.user.jwt,
  userProfile: state.user.userProfile,
  addEventResponse: state.event.addEventResponse,
  addEventFields: state.event.addEventFields,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  addNewEvent,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AddEvent);
