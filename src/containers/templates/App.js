import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { initializeEvents } from '../../actions/index';
import App from '../../components/templates/App/App';

const mapStateToProps = state => ({
  events: state.event.events,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  initializeEvents,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App);
