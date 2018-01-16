import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { initializeEvents, setSelectedEvent, clearSelectedEvent, setUserLocation } from '../../actions/index';
import Top from '../../components/organisms/Top/index';

const mapStateToProps = state => ({
  events: state.event.events,
  selectedEvent: state.event.selectedEvent,
  userLocation: state.user.userLocation,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  initializeEvents, setSelectedEvent, clearSelectedEvent, setUserLocation,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Top);

