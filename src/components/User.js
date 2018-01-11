import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';

import Profile from './Profile';
import OrderHistory from './OrderHistory';

import '../styles/User.css';

class User extends Component {
  componentDidMount() {
    if (this.props.jwt) {
      this.props.onComponentDidMount(this.props.jwt);
    }
  }

  render() {
    return (
      <main className="flex column center">
        <div id="user" className="flex restrict-width">
          { this.props.userProfile ?
            [
              <div key="1" id="profile-left" className="flex column horiCenter">
                <img id="profile-picture" src="/default-user.jpg" alt="profile" />
                <Link to={'/addevent'}>
                  <RaisedButton
                    primary
                    className="mui-button"
                    label="Add Event"
                    style={{ width: '100%', marginTop: '10px' }}
                  />
                </Link>
              </div>,
              <div key="2" className="grow">
                <div id="tabs" className="flex">
                  <div
                    className={this.props.selectedTab === 'profile' ? 'tab selected' : 'tab'}
                    onClick={() => this.props.onTabClick('profile')}
                    role="presentation"
                  >
                    Profile
                  </div>
                  <div
                    className={this.props.selectedTab === 'orderHistory' ? 'tab selected' : 'tab'}
                    onClick={() => this.props.onTabClick('orderHistory')}
                    role="presentation"
                  >
                    Order History
                  </div>
                </div>
                <Divider />
                { this.props.selectedTab === 'profile' ?
                  <Profile userProfile={this.props.userProfile} /> :
                  <OrderHistory orders={this.props.transactionHistory} />
                }
              </div>,
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
  jwt: PropTypes.string.isRequired,
  userProfile: PropTypes.shape(),
  selectedTab: PropTypes.string.isRequired,
  transactionHistory: PropTypes.arrayOf(Object),
  onComponentDidMount: PropTypes.func.isRequired,
  onTabClick: PropTypes.func.isRequired,
};

User.defaultProps = {
  transactionHistory: [],
  userProfile: undefined,
};

export default User;

