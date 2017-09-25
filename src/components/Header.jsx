import React from 'react';
import { Component } from 'react';
import { Link } from 'react-router-dom';

import '../styles/Header.css';

class Header extends Component {

  get authButton() {
    if(this.props.userProfile) {
      return (
        <nav className="gnav">
          <ul className="gnav-list flex">
            <li><Link to={} className="gnav-list-link">{ this.props.userProfile.name }</Link></li>
            <li><span className="gnav-list-link" onClick={this.props.onLogoutButtonClick}>Logout</span></li>
          </ul>
        </nav>
      )
    }
    return  (
      <nav className="gnav">
        <ul className="gnav-list flex">
          <li><Link to={} className="gnav-list-link" onClick={this.props.onLoginButtonClick}>Log in with facebook</Link></li>
        </ul>
      </nav>
      );
  }

  render() {
    return (
      <header>
        <h1><Link to="/" className="logo">Live Jazz</Link></h1>
        { this.authButton }
      </header>
    )
  }
}

export default Header;
