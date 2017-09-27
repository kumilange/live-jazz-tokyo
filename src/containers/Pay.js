import { connect } from 'react-redux';
import Pay from '../components/Pay';

const mapStateToProps = state => ({
  event: state.eventDetails,
  userProfile: state.userProfile,
  creditCardError: state.creditCardError,
});

const mapDispatchToProps = dispatch => ({
  setCreditCardError: () => dispatch({
    type: 'SET_CREDIT_CARD_ERROR',
  }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Pay);
