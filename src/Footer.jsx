import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="streaming-footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Company</h3>
          <Link to="/movie-info">Detailed Movie Info</Link> { /* About Us */ }
          <a href="#">Careers</a>
          <a href="#">Press</a>
        </div>
        <div className="footer-section">
          <h3>Support</h3>
          <a href="#">FAQ</a>
          <a href="#">Help Center</a>
          <a href="#">Contact Us</a>
        </div>
        <div className="footer-section">
          <h3>Social</h3>
          <a href="#">Facebook</a>
          <a href="#">Twitter</a>
          <a href="#">Instagram</a>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 Streaming Service. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;