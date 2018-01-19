import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import hello from '../../config/hello';
import { addAuthListener, logout } from '../../actions';
import Header from '../../components/organisms/Header';

class HeaderContainer extends Component {
  constructor() {
    super();
    this.state = {
      isTooltipOpen: false,
    };
    this.login = this.login.bind(this);
    this.toggleTooltip = this.toggleTooltip.bind(this);
  }
  componentDidMount() {
    this.props.addAuthListener();
  }

  async login() {
    await hello('facebook')
      .login();
  }

  toggleTooltip() {
    this.setState({
      isTooltipOpen: !this.state.isTooltipOpen,
    });
  }

  render() {
    return (
      <Header
        {...this.props}
        isTooltipOpen={this.state.isTooltipOpen}
        login={this.login}
        toggleTooltip={this.toggleTooltip}
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
