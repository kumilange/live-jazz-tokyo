import { connect } from 'react-redux';
import Map from '../Map';

import { setSelectedEvent } from '../actions';

const mapStateToProps = (state) => {
  return {
    events: state.events
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onMarkerClick: (event) => {
      dispatch(setSelectedEvent(event));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Map);

