import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logoImage from '../public/Filmrent 2.png';
import { Menu, X, User } from 'lucide-react';
import '../styles/Header.css';
import { FaShoppingCart } from "react-icons/fa";


const Header = ({showSmallCart, setShowSmallCart}) => {
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
          <Link to="/Contact" className="nav-link" onClick={toggleMenu}>Contact</Link>
        </nav>
        <div className="auth-buttons">
          <FaShoppingCart className='icon-header' onClick={() => setShowSmallCart(!showSmallCart)}/>
          <Link to="/profile" className="profile-button">
            <User size={24} />
          </Link>
        </div>
        
      </div>
    </header>
  );
};

export default Header;