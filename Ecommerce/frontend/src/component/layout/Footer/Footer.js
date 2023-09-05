import React from 'react';
import { FaTwitter, FaInstagram, FaGithub } from 'react-icons/fa';

const icon = {
    color: '#333', 
    marginRight: '10px', 
    textDecoration: 'none'
}

const footerStyle = {
    backgroundColor: 'white', 
    padding: '20px', 
    textAlign: 'center'
}

const Footer = () => {
  return (
    <footer style={footerStyle}>
      <div style={{ marginBottom: '10px' }}>
        © 2023 Rishabh Agarwal. All Rights Reserved.
      </div>
      <div style={{ fontSize: '24px', marginTop: '10px' }}>
        <a href="https://github.com/RishabhAgarwal123" target='_blank' rel='noreferrer' style={icon}>
          <FaGithub />
        </a>
        <a href="https://twitter.com/rishabh01234578" target='_blank' rel='noreferrer' style={icon}>
          <FaTwitter />
        </a>
        <a href="https://www.instagram.com/rishabh404agarwal/" target='_blank' rel='noreferrer' style={icon}>
          <FaInstagram />
        </a>
      </div>
    </footer>
  );
}

export default Footer;
