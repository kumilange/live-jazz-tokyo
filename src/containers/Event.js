import { connect } from 'react-redux';

import Event from '../components/Event';
import { getEventDetails, toggleMap } from '../actions';

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
    dispatch(toggleMap());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Event);
