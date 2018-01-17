import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './Header.css';
import { isObjectEmpty } from '../../../utils';

const Header = ({ userProfile, login, logout }) => (
  <header className="dark flex">
    <div id="header-inner" className="flex restrict-width">
      <h1 className="flex">
        <Link to="/" className="logo">LiveJazz</Link>
      </h1>
      { !isObjectEmpty(userProfile)
        ? <nav className="gnav">
          <ul className="gnav-list flex">
            <li><Link to={`/user/${userProfile.id}`} className="gnav-list-link">{ userProfile.name }</Link></li>
            <li><Link to={'/'} className="gnav-list-link" onClick={logout}>Logout</Link></li>
          </ul>
        </nav>
        : <nav className="gnav">
          <ul className="gnav-list flex">
            <li><Link to={''} className="gnav-list-link" onClick={login}>
              Login with <br /> Facebook</Link></li>
          </ul>
        </nav>
      }
    </div>
  </header>
);

Header.propTypes = {
  userProfile: PropTypes.shape().isRequired,
  login: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
};

export default Header;
