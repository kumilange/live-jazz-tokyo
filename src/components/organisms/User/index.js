import React from 'react';
import PropTypes from 'prop-types';
import { Divider } from 'material-ui';

import { isObjectEmpty } from '../../../utils/index';
import Profile from '../../molecules/Profile';
import OrderHistory from '../../molecules/OrderHistory';
import './User.css';

const User = ({ history, userProfile, selectedTab, orders, setSelectedTab }) => {
  if (isObjectEmpty(userProfile)) history.push('/');
  return (
    <main className="flex column center">
      <div id="user" className="flex restrict-width">
        <div key="1" id="profile-left" className="flex column horiCenter">
          <img id="profile-picture" src={userProfile.picture} alt="profile" />
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
};

User.propTypes = {
  userProfile: PropTypes.shape().isRequired,
  selectedTab: PropTypes.string.isRequired,
  orders: PropTypes.arrayOf(Object).isRequired,
  setSelectedTab: PropTypes.func.isRequired,
  history: PropTypes.shape().isRequired,
};

export default User;

