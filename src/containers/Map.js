import { connect } from 'react-redux';
import Map from '../components/Map';

import { setSelectedEvent, clearSelectedEvent, setUserLocation } from '../actions';

const mapStateToProps = state => ({
  events: state.events,
  selectedEvent: state.selectedEvent,
  userLocation: state.userLocation,
});

const mapDispatchToProps = dispatch => ({
  onMarkerClick: (event) => {
    dispatch(setSelectedEvent(event));
  },
  onInfoWindowClose: () => {
    dispatch(clearSelectedEvent());
  },
  onReceivedUserLocation: (position) => {
    dispatch(setUserLocation(position));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Map);

