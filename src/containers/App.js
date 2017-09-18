import { connect } from 'react-redux';
import App from '../components/App';

import { initializeEvents } from '../actions';

const mapStateToProps = state => ({
  events: state.events,
});

const mapDispatchToProps = dispatch => ({
  initializeEvents: () => {
    dispatch(initializeEvents());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
