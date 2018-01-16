import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Event from '../../components/organisms/Event/Event';
import { getEventDetails, toggleMap } from '../../actions/index';

const mapStateToProps = state => ({
  event: state.event.eventDetails,
  isFetching: state.event.isFetching,
  showMap: state.event.showMap,
  jwt: state.user.jwt,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getEventDetails, toggleMap,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Event);
