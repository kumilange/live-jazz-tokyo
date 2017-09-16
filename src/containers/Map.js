import { connect } from 'react-redux';
import Map from '../Map';

const mapStateToProps = state => ({
  events: state.events,
});

export default connect(mapStateToProps, null)(Map);
