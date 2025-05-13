

import React from 'react';
import "../styles/global.css";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaPhoneAlt,
  FaEnvelope,
} from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">

        <div className="footer-section about">
          <h2><span className="highlight">Smile</span>Safe.ai</h2>
          <p>
            SmileSafe.ai is committed to early detection and prevention of oral diseases through advanced AI technology.
            Join us in creating a healthier smile for everyone.
          </p>
          <div className="footer-socials">
            <FaFacebookF />
            <FaTwitter />
            <FaInstagram />
            <FaLinkedinIn />
          </div>
        </div>

       
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/upload">Upload Image</Link></li>
            <li><Link to="/education">Education</Link></li>

            <li><Link to="/login">Login</Link></li>
            <li><Link to="/signup">Signup</Link></li>
          </ul>
        </div>

       
        <div className="footer-section contact">
          <h3>Help & Contact</h3>
          <ul>
            <li><Link to="/terms">Terms of Use</Link></li>
            <li><Link to="/privacy">Privacy Policy</Link></li>
            <li><Link to="/faq">FAQs</Link></li>
          </ul>
          <p><FaPhoneAlt /> +1 800 123 4567</p>
          <p><FaEnvelope /> info@smilesafe.ai</p>
        </div>

      </div>

  
      <div className="footer-bottom">
        <p>© 2025 SmileSafe.ai. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
