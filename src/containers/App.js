import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { initializeEvents } from '../actions';
import App from '../components/App/App';

const mapStateToProps = state => ({
  events: state.event.events,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  initializeEvents,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App);
