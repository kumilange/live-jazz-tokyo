import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Event from '../components/Event/Event';
import { getEventDetails, toggleMap } from '../actions';

const mapStateToProps = state => ({
  event: state.event.eventDetails,
  showMap: state.event.showMap,
  jwt: state.user.jwt,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getEventDetails, toggleMap,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Event);
