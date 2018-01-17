import { connect } from 'react-redux';
import Confirmation from '../../components/organisms/Confirmation';

const mapStateToProps = state => ({
  jwt: state.user.jwt,
  chargeResponse: state.pay.chargeResponse,
});

export default connect(mapStateToProps, null)(Confirmation);

