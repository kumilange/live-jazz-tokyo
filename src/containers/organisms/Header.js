import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import hello from '../../config/hello';
import { addAuthListener, logout } from '../../actions';
import Header from '../../components/organisms/Header';

class HeaderContainer extends Component {
  componentDidMount() {
    this.props.addAuthListener();
    this.login = this.login.bind(this);
  }

  async login() {
    await hello('facebook')
      .login({ scope: 'email' });
  }

  render() {
    return (
      <Header
        {...this.props}
        login={this.login}
      />);
  }
}

HeaderContainer.propTypes = {
  addAuthListener: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  userProfile: state.user.userProfile,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  addAuthListener, logout,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer);
