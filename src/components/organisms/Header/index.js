import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { isObjectEmpty } from '../../../utils';
import { SignoutIcon, FacebookIcon } from '../../atoms/Icon/Icon';
import './Header.css';

const Header = ({ userProfile, login, logout }) => (
  <header className="dark flex">
    <div id="header-inner" className="flex restrict-width">
      <h1 className="flex">
        <Link to="/" className="logo">LiveJazz</Link>
      </h1>
      { !isObjectEmpty(userProfile)
        ? <nav className="gnav">
          <ul className="gnav-list flex vertCenter">
            <li>
              <Link to={`/user/${userProfile.id}`} className="gnav-list-link">
                <img src={userProfile.picture} className="thumbnail" alt="profile" />
              </Link>
            </li>
            <li>
              <Link to={'/'} className="gnav-list-link" onClick={logout}>
                <span className="signout">{SignoutIcon}</span>
              </Link>
            </li>
          </ul>
        </nav>
        : <nav className="gnav">
          <ul className="gnav-list flex">
            <li>
              <Link to={''} className="gnav-list-link flex vertCenter" onClick={login}>
                <span className="facebook">{FacebookIcon}</span>
                <span>Login with <br /> Facebook</span>
              </Link>
            </li>
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
