import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Divider, RaisedButton } from 'material-ui';

import Profile from '../../molecules/Profile';
import OrderHistory from '../../molecules/OrderHistory';

import './User.css';

class User extends Component {
  componentDidMount() {
    if (this.props.jwt) {
      this.props.getOrderHistory(this.props.jwt);
    }
  }

  render() {
    const { history, userProfile, selectedTab, orders, setSelectedTab } = this.props;
    if (!userProfile) history.push('/');
    return (
      <main className="flex column center">
        <div id="user" className="flex restrict-width">
          <div key="1" id="profile-left" className="flex column horiCenter">
            <img id="profile-picture" src="/default-user.jpg" alt="profile" />
            <Link to={'/addevent'}>
              <RaisedButton
                primary
                className="mui-button"
                label="Create Event"
                style={{ width: '100%', marginTop: '10px' }}
              />
            </Link>
          </div>
          <div key="2" className="grow">
            <div id="tabs" className="flex">
              <div
                className={selectedTab === 'profile' ? 'tab selected' : 'tab'}
                onClick={() => setSelectedTab('profile')}
                role="presentation"
              >Profile</div>
              <div
                className={selectedTab === 'orderHistory' ? 'tab selected' : 'tab'}
                onClick={() => setSelectedTab('orderHistory')}
                role="presentation"
              >Order History</div>
            </div>
            <Divider />
            { selectedTab === 'profile' ?
              <Profile userProfile={userProfile} /> :
              <OrderHistory orders={orders} />
            }
          </div>
        </div>
        <div className="flex grow" />
      </main>
    );
  }
}

User.propTypes = {
  jwt: PropTypes.string,
  userProfile: PropTypes.shape(),
  selectedTab: PropTypes.string.isRequired,
  orders: PropTypes.arrayOf(Object),
  getOrderHistory: PropTypes.func.isRequired,
  setSelectedTab: PropTypes.func.isRequired,
  history: PropTypes.shape(),
};

User.defaultProps = {
  jwt: undefined,
  orders: [],
  userProfile: undefined,
  history: undefined,
};

export default User;

