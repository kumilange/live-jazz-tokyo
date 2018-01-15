import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { setSelectedEvent, clearSelectedEvent, setUserLocation } from '../actions';
import Map from '../components/Map';

const mapStateToProps = state => ({
  events: state.event.events,
  selectedEvent: state.event.selectedEvent,
  userLocation: state.user.userLocation,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  setSelectedEvent, clearSelectedEvent, setUserLocation,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Map);

