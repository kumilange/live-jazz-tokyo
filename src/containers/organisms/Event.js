import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Event from '../../components/organisms/Event';
import { getEventDetails, toggleMap } from '../../actions';

class EventContainer extends Component {
  componentDidMount() {
    this.props.getEventDetails(this.props.match.params.id);
  }

  render() {
    return (
      <Event
        {...this.props}
      />
    );
  }
}

EventContainer.propTypes = {
  match: PropTypes.shape().isRequired,
  getEventDetails: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  event: state.event.eventDetails,
  isFetching: state.event.isFetching,
  showMap: state.event.showMap,
  jwt: state.user.jwt,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getEventDetails, toggleMap,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(EventContainer);
