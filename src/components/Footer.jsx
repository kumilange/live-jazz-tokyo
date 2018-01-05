import React from 'react';

import '../styles/Footer.css';

const Footer = () => (
  <footer id="footer" className="flex column center dark white">
    <p id="copyright">Copyright © {(new Date()).getFullYear()} Live Jazz</p>
  </footer>
);

export default Footer;
