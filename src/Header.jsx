import React from 'react';
import { Link } from 'react-router-dom';
import logoImage from '../public/Filmrent.png'; 
import '../styles/Header.css';

const Header = () => {
  return (
    <header className="streaming-header">
      <div className="header-content">
        <div className="logo-container">
          <img src={logoImage} alt="FilmRent Logo" className="logo-image" />
        </div>
        <nav className="navigation-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/movies" className="nav-link">Movies</Link>
          <Link to="/series" className="nav-link">Series</Link>
          <Link to="/contact" className="nav-link">Contact</Link>
          <Link to="/checkout" className='nav-link'>Checkout</Link>
        </nav>
        <div className="auth-buttons">
          <button className="auth-button login">Log in</button>
          <button className="auth-button signup">Sign up</button>
        </div>
      </div>
    </header>
  );
};

export default Header;