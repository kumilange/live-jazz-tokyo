import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Pay from '../../components/organisms/Pay/index';
import { setChargeResponse } from '../../actions/index';

const mapStateToProps = state => ({
  event: state.event.eventDetails,
  userProfile: state.user.userProfile,
  jwt: state.user.jwt,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  setChargeResponse,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Pay);
