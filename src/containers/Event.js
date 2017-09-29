import { connect } from 'react-redux';
import Event from '../components/Event';

import { getEventDetails } from '../actions';

const mapStateToProps = state => ({
  event: state.eventDetails,
  showMap: state.showMap,
  userProfile: state.userProfile,
});

const mapDispatchToProps = dispatch => ({
  onComponentDidMount: (eventID) => {
    dispatch(getEventDetails(eventID));
  },
  toggleMap: () => {
    dispatch({ type: 'SHOW_MAP' });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Event);
