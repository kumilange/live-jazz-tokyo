import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import '../styles/Header.css';

const Header = (props) => (
  <header className="dark flex">
    <div id="header-inner" className="flex restrict-width">
      <h1><Link to="/" className="logo">Live Jazz</Link></h1>
      { props.userProfile
        ? <nav className="gnav">
          <ul className="gnav-list flex">
            <li><Link to={'/user'} className="gnav-list-link">{ props.userProfile.name }</Link></li>
            <li><Link to={'/'} className="gnav-list-link" onClick={props.onLogoutButtonClick}>Logout</Link></li>
          </ul>
        </nav>
        : <nav className="gnav">
          <ul className="gnav-list flex">
            <li><Link to={''} className="gnav-list-link" onClick={props.onLoginButtonClick}>
              Log in with <br /> facebook</Link></li>
          </ul>
        </nav>
      }
    </div>
  </header>
);

Header.propTypes = {
  userProfile: PropTypes.shape(),
  onLogoutButtonClick: PropTypes.func.isRequired,
  onLoginButtonClick: PropTypes.func.isRequired,
};

Header.defaultProps = {
  userProfile: undefined,
};

export default Header;
