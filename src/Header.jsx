import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logoImage from '../public/Filmrent 2.png';
import { Menu, X } from 'lucide-react';
import '../styles/Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="streaming-header">
      <div className="header-content">
        <div className="logo-container">
          <img src={logoImage} alt="FilmRent Logo" className="logo-image" />
        </div>
        <button className="menu-toggle" onClick={toggleMenu}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        <nav className={`navigation-links ${isMenuOpen ? 'open' : ''}`}>
          <Link to="/" className="nav-link" onClick={toggleMenu}>Home</Link>
          <Link to="/movies" className="nav-link" onClick={toggleMenu}>Movies</Link>
          <Link to="/series" className="nav-link" onClick={toggleMenu}>Series</Link>
          <Link to="/contact" className="nav-link" onClick={toggleMenu}>Contact</Link>
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