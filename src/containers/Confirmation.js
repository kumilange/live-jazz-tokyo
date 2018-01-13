import { connect } from 'react-redux';
import Confirmation from '../components/Confirmation';

const mapStateToProps = state => ({
  jwt: state.jwt,
  chargeResponse: state.chargeResponse,
});

export default connect(mapStateToProps, null)(Confirmation);

