import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { initializeEvents, setSelectedEvent, clearSelectedEvent, setUserLocation } from '../../actions';
import Top from '../../components/organisms/Top';

const mapStateToProps = state => ({
  events: state.event.events,
  selectedEvent: state.event.selectedEvent,
  userLocation: state.user.userLocation,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  initializeEvents, setSelectedEvent, clearSelectedEvent, setUserLocation,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Top);

