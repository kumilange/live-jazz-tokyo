import { connect } from 'react-redux';
import Event from '../components/Event';

import { getEventDetails, setChargeResponse } from '../actions';

const mapStateToProps = state => ({
  event: state.eventDetails,
});

const mapDispatchToProps = dispatch => ({
  onComponentDidMount: (eventID) => {
    dispatch(getEventDetails(eventID));
  },
  onReceiveChargeResponse: (message) => {
    dispatch(setChargeResponse(message));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Event);

