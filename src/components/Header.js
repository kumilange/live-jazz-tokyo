import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import '../styles/Header.css';

class Header extends Component {
  componentDidMount() {
    this.props.onComponentDidMount();
  }
  render() {
    const { userProfile, onLoginButtonClick, onLogoutButtonClick } = this.props;
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
                <li><Link to={'/'} className="gnav-list-link" onClick={onLogoutButtonClick}>Logout</Link></li>
              </ul>
            </nav>
            : <nav className="gnav">
              <ul className="gnav-list flex">
                <li><Link to={''} className="gnav-list-link" onClick={onLoginButtonClick}>
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
  onComponentDidMount: PropTypes.func.isRequired,
  onLogoutButtonClick: PropTypes.func.isRequired,
  onLoginButtonClick: PropTypes.func.isRequired,
};

Header.defaultProps = {
  userProfile: undefined,
};

export default Header;
