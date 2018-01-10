import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import '../styles/Header.css';

class Header extends Component {
  componentDidMount() {
    this.props.onComponentDidMount();
  }
  render() {
    return (
      <header className="dark flex">
        <div id="header-inner" className="flex restrict-width">
          <h1 className="flex">
            <Link to="/" className="logo">LiveJazz</Link>
          </h1>
          { this.props.userProfile
            ? <nav className="gnav">
              <ul className="gnav-list flex">
                <li><Link to={`/user/${this.props.userProfile.id}`} className="gnav-list-link">{ this.props.userProfile.name }</Link></li>
                <li><Link to={'/'} className="gnav-list-link" onClick={this.props.onLogoutButtonClick}>Logout</Link></li>
              </ul>
            </nav>
            : <nav className="gnav">
              <ul className="gnav-list flex">
                <li><Link to={''} className="gnav-list-link" onClick={this.props.onLoginButtonClick}>
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
