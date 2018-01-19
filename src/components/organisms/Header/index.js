import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { isObjectEmpty } from '../../../utils';
import Tooltip from '../../atoms/Tooltip';
import { FacebookIcon } from '../../atoms/Icon/Icon';
import './Header.css';

const Header = ({ userProfile, isTooltipOpen, login, logout, toggleTooltip }) => (
  <header className="dark flex">
    <div id="header-inner" className="flex restrict-width">
      <h1 className="flex">
        <Link to="/" className="logo">LiveJazz</Link>
      </h1>
      { !isObjectEmpty(userProfile)
        ? <nav className="gnav">
          <ul className="gnav-list flex vertCenter">
            <li>
              <img role="presentation" src={userProfile.picture} className="thumbnail" alt="profile" onClick={toggleTooltip} />
            </li>
          </ul>
          <Tooltip
            userProfile={userProfile}
            isTooltipOpen={isTooltipOpen}
            logout={logout}
            toggleTooltip={toggleTooltip}
          />
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
  isTooltipOpen: PropTypes.bool.isRequired,
  login: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  toggleTooltip: PropTypes.func.isRequired,
};

export default Header;
