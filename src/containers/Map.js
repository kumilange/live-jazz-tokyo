import { connect } from 'react-redux';
import Map from '../Map';

import { setSelectedEvent } from '../actions';

const mapStateToProps = state => ({
  events: state.events,
  selectedEvent: state.selectedEvent,
});

const mapDispatchToProps = dispatch => ({
  onMarkerClick: (event) => {
    dispatch(setSelectedEvent(event));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Map);

