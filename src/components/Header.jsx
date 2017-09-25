import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import '../styles/Header.css';

const Header = (props) => (
  <header id="header" className="flex dark">
    <h1><Link to="/" className="logo">Live Jazz</Link></h1>
    { props.userProfile
      ? <nav className="gnav">
        <ul className="gnav-list flex">
          <li><Link to={'/user'} className="gnav-list-link">{ props.userProfile.name }</Link></li>
          <li><Link to={'/'}  className="gnav-list-link" onClick={props.onLogoutButtonClick}>Logout</Link></li>
        </ul>
        </nav>
      : <nav className="gnav">
        <ul className="gnav-list flex">
          <li><Link to={''} className="gnav-list-link" onClick={props.onLoginButtonClick}>Log in with facebook</Link></li>
        </ul>
      </nav>
    }
  </header>
)

Header.propTypes = {
  userProfile: PropTypes.shape(),
  onLogoutButtonClick: PropTypes.func.isRequired,
  onLoginButtonClick: PropTypes.func.isRequired,
};

Header.defaultProps = {
  userProfile: undefined,
};

export default Header;
