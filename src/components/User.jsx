import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Divider from 'material-ui/Divider';

import Profile from './Profile';
import OrderHistory from './OrderHistory';

import '../styles/User.css';

class User extends Component {
  componentDidMount() {
    if(this.props.userProfile) {
      this.props.onComponentDidMount(this.props.userProfile.jwt);
    }
  }

  render() {
    return (
      <main className="flex column center">
        <div id="user" className="flex restrict-width">
          { this.props.userProfile ?
            [
              <img key='1' id="profile-picture" src="/default-user.jpg" />,
              <div key='2' className="grow">
                <div id="tabs" className="flex">
                  <div className={ this.props.selectedTab === 'profile' ? 'tab selected' : 'tab' }
                    onClick={() => this.props.onTabClick('profile')}>
                    Profile
                  </div>
                  <div className={ this.props.selectedTab === 'orderHistory' ? 'tab selected' : 'tab' }
                    onClick={() => this.props.onTabClick('orderHistory')}>
                    Order History
                  </div>
                </div>
                <Divider />
                { this.props.selectedTab === 'profile' ?
                  <Profile userProfile={ this.props.userProfile } /> :
                  <OrderHistory orders={ this.props.transactionHistory } />
                }
              </div>
            ] :
            <div>
              Please log in!
            </div>
          }
        </div>
        <div className="flex grow" />
      </main>
    );
  }
}

User.propTypes = {
  userProfile: PropTypes.shape(),
  transactionHistory: PropTypes.arrayOf(Object),
};

User.defaultProps = {
  transactionHistory: [],
  userProfile: undefined,
};

export default User;

