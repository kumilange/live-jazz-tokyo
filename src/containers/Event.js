import { connect } from 'react-redux';
import Event from '../components/Event';

import { getEventDetails, setChargeResponse } from '../actions';

const mapStateToProps = state => ({
  event: state.eventDetails,
  showMap: state.showMap,
});

const mapDispatchToProps = dispatch => ({
  onComponentDidMount: (eventID) => {
    dispatch(getEventDetails(eventID));
  },
  onReceiveChargeResponse: (result) => {
    dispatch(setChargeResponse(result));
  },
  toggleMap: () => {
    dispatch({ type: 'SHOW_MAP' });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Event);

