import { connect } from 'react-redux';

import Event from '../components/Event';
import { getEventDetails, toggleMap } from '../actions';

const mapStateToProps = state => ({
  event: state.event.eventDetails,
  showMap: state.event.showMap,
  jwt: state.user.jwt,
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
