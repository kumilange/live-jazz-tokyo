import { connect } from 'react-redux';

import Event from '../components/Event';
import { SHOW_MAP } from '../config/const';
import { getEventDetails } from '../actions';

const mapStateToProps = state => ({
  event: state.eventDetails,
  showMap: state.showMap,
  jwt: state.jwt,
});

const mapDispatchToProps = dispatch => ({
  onComponentDidMount: (eventId) => {
    dispatch(getEventDetails(eventId));
  },
  toggleMap: () => {
    dispatch({ type: SHOW_MAP });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Event);
