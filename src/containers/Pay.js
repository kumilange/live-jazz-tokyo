import { connect } from 'react-redux';

import Pay from '../components/Pay';
import { setChargeResponse } from '../actions';

const mapStateToProps = state => ({
  event: state.event.eventDetails,
  userProfile: state.user.userProfile,
  jwt: state.user.jwt,
});

const mapDispatchToProps = dispatch => ({
  setChargeResponse: chargeResponse =>
    dispatch(setChargeResponse(chargeResponse)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Pay);
