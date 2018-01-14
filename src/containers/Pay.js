import { connect } from 'react-redux';

import { SET_CHARGE_RESPONSE } from '../config/const';
import Pay from '../components/Pay';

const mapStateToProps = state => ({
  event: state.eventDetails,
  userProfile: state.userProfile,
  jwt: state.jwt,
});

const mapDispatchToProps = dispatch => ({
  setChargeResponse: chargeResponse => dispatch({
    type: SET_CHARGE_RESPONSE,
    chargeResponse,
  }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Pay);
