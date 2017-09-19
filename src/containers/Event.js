import { connect } from 'react-redux';
import Event from '../components/Event';

import { getEventDetails } from '../actions';

const mapStateToProps = state => ({
  event: state.eventDetails,
});

const mapDispatchToProps = dispatch => ({
  onComponentDidMount: (eventID) => {
    dispatch(getEventDetails(eventID));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Event);

