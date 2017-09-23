import React from 'react';
import { Component } from 'react';
import { Link } from 'react-router-dom';

import '../styles/Header.css';

class Header extends Component {

  get authButton() {
    if(this.props.userProfile) {
      return (
        <div id='facebook-login'>
          <Link to={``}>
            <button>{ this.props.userProfile.name }</button>
          </Link>
          <button onClick={this.props.onLogoutButtonClick}>Logout</button>
        </div>
      )
    }
    return  (
      <button id="facebook-login" onClick={this.props.onLoginButtonClick}>
        Log in with facebook
      </button>);
  }

  render() {
    return (
      <header>
        <h1 id='title'>Live Jazz</h1>
        { this.authButton }
      </header>
    )
  }
}

export default Header;
