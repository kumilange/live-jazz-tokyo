import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Profile from './Profile';
import OrderHistory from './OrderHistory';

import '../styles/User.css';

class User extends Component {
  render() {
    return (
      <main className="flex column center">
        <div className="flex restrict-width">
          <img id="profile-picture" src="/default-user.jpg" />
          <div className="grow">
            <div id="tabs" className="flex">
              <div className={ this.props.selectedTab === 'profile' ? 'tab selected' : 'tab' }
                onClick={() => this.props.setSelectedTab('profile')}
              >Profile</div>
              <div className={ this.props.selectedTab === 'orderHistory' ? 'tab selected' : 'tab' }
                onClick={() => this.props.setSelectedTab('orderHistory')}
              >Order History</div>
            </div>
            <hr id='divider' />
            { this.props.selectedTab === 'profile' ?
              <Profile id={this.props.match.params.id} /> :
              <OrderHistory />
            }
          </div>
        </div>
        <div className="flex grow" />
      </main>
    );
  }
}

User.propTypes = {
  
};

User.defaultProps = {
  
};

export default User;

