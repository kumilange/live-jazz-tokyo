import { connect } from 'react-redux';

import { initializeEvents } from '../actions';
import App from '../components/App';

const mapStateToProps = state => ({
  events: state.events,
});

const mapDispatchToProps = dispatch => ({
  initializeEvents: () => {
    dispatch(initializeEvents());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
