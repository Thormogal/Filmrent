import React from 'react';
import { Search, ChevronRight } from 'lucide-react';
import '../styles/HomeScreen.css';

const HomeScreen = () => {
  return (
    <div className="home-screen">
      <div className="welcome-section">
        <h1 className="welcome-title">Welcome to FilmRent</h1>
        <p className="welcome-text">
          Explore a world of movies, series, and exclusive content—all in one place, ready to stream anytime, anywhere, on any device.
        </p>
        <div className="search-bar">
          <Search className="search-icon" size={20} />
          <input type="text" placeholder="Search for movies, series, and more..." />
        </div>
      </div>
      <section className="content-section">
        <div className="section-header">
          <h2 className="section-title">Trending Now</h2>
          <button className="see-all-btn">See All <ChevronRight size={20} /></button>
        </div>
        <div className="thumbnail-list">
          {[...Array(9)].map((_, index) => (
            <div key={index} className="thumbnail-item">
              <div className="thumbnail-image">
                <div className="thumbnail-content">
                  <div className="shape triangle"></div>
                  <div className="shape square"></div>
                  <div className="shape circle"></div>
                </div>
              </div>
              <span className="thumbnail-label">Movie Title</span>
            </div>
          ))}
        </div>
      </section>
      <section className="content-section">
        <div className="section-header">
          <h2 className="section-title">New Releases</h2>
          <button className="see-all-btn">See All <ChevronRight size={20} /></button>
        </div>
        <div className="grid">
          <div className="grid-item large"><div className="triangle"></div></div>
          <div className="grid-item large"><div className="triangle"></div></div>
          <div className="grid-item"><div className="triangle"></div></div>   
                 <div className="grid-item"><div className="triangle"></div></div>
                 <div className="grid-item"><div className="triangle"></div></div>

          <div className="grid-item"><div className="triangle"></div></div>
        </div>
      </section>
    </div>
  );
};

export default HomeScreen;