import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { initializeEvents, setSelectedEvent, clearSelectedEvent, setUserLocation } from '../../actions';
import Top from '../../components/organisms/Top';

class TopContainer extends Component {
  componentDidMount() {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser');
      return;
    }
    navigator.geolocation.getCurrentPosition((position) => {
      this.props.setUserLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    });
    this.props.initializeEvents();
  }

  render() {
    return (
      <Top {...this.props} />
    );
  }
}

TopContainer.propTypes = {
  setUserLocation: PropTypes.func.isRequired,
  initializeEvents: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  events: state.event.events,
  selectedEvent: state.event.selectedEvent,
  userLocation: state.user.userLocation,
  orderDict: state.user.orderDict,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  initializeEvents, setSelectedEvent, clearSelectedEvent, setUserLocation,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(TopContainer);

