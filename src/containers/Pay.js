import { connect } from 'react-redux';
import Pay from '../components/Pay';

const mapStateToProps = state => ({
  event: state.eventDetails,
  userProfile: state.userProfile,
  jwt: state.jwt,
  creditCardError: state.creditCardError,
  nameErrorText: state.nameErrorText,
  addressErrorText: state.addressErrorText,
  emailErrorText: state.emailErrorText,
});

const mapDispatchToProps = dispatch => ({
  setCreditCardError: () => dispatch({
    type: 'SET_CREDIT_CARD_ERROR',
  }),
  setNameErrorText: nameErrorText => dispatch({
    type: 'SET_NAME_ERROR_TEXT',
    nameErrorText,
  }),
  setAddressErrorText: addressErrorText => dispatch({
    type: 'SET_ADDRESS_ERROR_TEXT',
    addressErrorText,
  }),
  setEmailErrorText: emailErrorText => dispatch({
    type: 'SET_EMAIL_ERROR_TEXT',
    emailErrorText,
  }),
  setChargeResponse: chargeResponse => dispatch({
    type: 'SET_CHARGE_RESPONSE',
    chargeResponse,
  }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Pay);
