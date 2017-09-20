import { connect } from 'react-redux';
import Event from '../components/Event';

import { setEventDetails, setChargeResponse } from '../actions';

const mapStateToProps = state => ({
  event: state.eventDetails,
});

const mapDispatchToProps = dispatch => ({
  onReceiveChargeResponse: (message) => {
    dispatch(setChargeResponse(message));
  },
  receivedEventDetails: (event) => {
    dispatch(setEventDetails(event));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Event);

