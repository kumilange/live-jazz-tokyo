import { connect } from 'react-redux';
import Event from '../components/Event';

import { setEventDetails } from '../actions';

const mapStateToProps = state => ({
  event: state.eventDetails,
});

const mapDispatchToProps = dispatch => ({
  receivedEventDetails: (event) => {
    dispatch(setEventDetails(event));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Event);

