import React from 'react';

import '../styles/Header.css';

const Header = () => (
  <header id="header" className="flex dark">
    <h1><a href="" className="logo">Live Jazz</a></h1>
    <nav className="gnav">
      <ul className="gnav-list">
        <li><a href="" className="gnav-list-link">Log In</a></li>
        <li><a href="" className="gnav-list-link">Sign Up</a></li>
      </ul>
    </nav>
  </header>
);

export default Header;
