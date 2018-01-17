import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import User from '../../components/organisms/User';
import { getOrderHistory, setSelectedTab } from '../../actions';

class UserContainer extends Component {
  componentDidMount() {
    if (this.props.jwt) this.props.getOrderHistory(this.props.jwt);
  }

  render() {
    return (
      <User {...this.props} />
    );
  }
}

UserContainer.propTypes = {
  jwt: PropTypes.string.isRequired,
  getOrderHistory: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  jwt: state.user.jwt,
  selectedTab: state.user.selectedTab,
  userProfile: state.user.userProfile,
  orders: state.user.orders,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getOrderHistory, setSelectedTab,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(UserContainer);
