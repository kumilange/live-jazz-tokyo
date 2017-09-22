import React from 'react';
import { Component } from 'react';

import '../styles/Header.css';

class Header extends Component {

  render() {
    return (
      <header>
        <h1 id='title'>Live Jazz</h1>
        <button id="facebook-login" onClick={this.props.onLoginButtonClick}>
          Log in with facebook
        </button>
      </header>
    )
  }
}

export default Header;
