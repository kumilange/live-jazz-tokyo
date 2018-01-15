import { connect } from 'react-redux';

import Pay from '../components/Pay';
import { setChargeResponse } from '../actions';

const mapStateToProps = state => ({
  event: state.eventDetails,
  userProfile: state.userProfile,
  jwt: state.jwt,
});

const mapDispatchToProps = dispatch => ({
  setChargeResponse: chargeResponse =>
    dispatch(setChargeResponse(chargeResponse)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Pay);
