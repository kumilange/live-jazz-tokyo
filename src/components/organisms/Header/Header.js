import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import hello from '../../../config/hello';
import './Header.css';

class Header extends Component {
  componentDidMount() {
    this.props.addAuthListener();
    this.loging = this.login.bind(this);
  }

  async login() {
    await hello('facebook')
      .login({ scope: 'email' });
  }

  render() {
    const { userProfile, logout } = this.props;
    return (
      <header className="dark flex">
        <div id="header-inner" className="flex restrict-width">
          <h1 className="flex">
            <Link to="/" className="logo">LiveJazz</Link>
          </h1>
          { userProfile
            ? <nav className="gnav">
              <ul className="gnav-list flex">
                <li><Link to={`/user/${userProfile.id}`} className="gnav-list-link">{ userProfile.name }</Link></li>
                <li><Link to={'/'} className="gnav-list-link" onClick={logout}>Logout</Link></li>
              </ul>
            </nav>
            : <nav className="gnav">
              <ul className="gnav-list flex">
                <li><Link to={''} className="gnav-list-link" onClick={this.login}>
                  Login with <br /> Facebook</Link></li>
              </ul>
            </nav>
          }
        </div>
      </header>
    );
  }
}


Header.propTypes = {
  userProfile: PropTypes.shape(),
  addAuthListener: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
};

Header.defaultProps = {
  userProfile: undefined,
};

export default Header;
