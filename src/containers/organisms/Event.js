import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Event from '../../components/organisms/Event/Event';
import { clearEventDetails, getEventDetails, toggleMap } from '../../actions/index';

const mapStateToProps = state => ({
  event: state.event.eventDetails,
  showMap: state.event.showMap,
  jwt: state.user.jwt,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  clearEventDetails, getEventDetails, toggleMap,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Event);
