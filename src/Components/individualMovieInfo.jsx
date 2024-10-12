import React from 'react';
import '/src/CSS/individualMovieInfo.css';
import reviewIcon from '/reviewIcon.png';
import placeholderPoster from '/Filmrent.png';

function IndividualMovieInfo() {
  return (
    <div className="movie-layout-wrapper">
      {/* Container for title, poster, price, buy button */}
      <div className="movie-details-container">
        <div className="movie-title-container">
          <h1>Movie Title <span className="movie-release-year">(2024)</span></h1>
        </div>
        <img
          src={placeholderPoster} alt="Film Poster" className="movie-poster"
        />
        <div className="movie-price-container">
          <p>Price: 49 SEK</p>
        </div>
        <div className="movie-button-container">
          <button className="buy-button">Buy</button>
        </div>
      </div>

      {/* New container for extra movie information */}
      <div className="movie-extra-info-container">
        <div className="movie-meta-info">
          <div className="movie-meta-left">
            <p>Genre: Action, Drama</p>
            <p>Original Language: English</p>
            <p>Playtime: 2h 30min</p>
          </div>
          <div className="movie-button-wrapper">
            <button className="trailer-button">
              <i className="fas fa-play play-icon"></i> Watch Trailer
            </button>
            <button className="favourite-button">Add to Favourites</button>
            <div className="review-icon">
              <img src={reviewIcon} alt="Review Icon" className="review-icon-img" />
            </div>
          </div>
        </div>
        <div className="movie-description">
          <h2>Movie Description</h2>
          <p>
            This is a short description of the movie.
            Here you can write about the plot, main characters, and other details that make the movie interesting.
          </p>
        </div>
        <div className="movie-cast">
          <h3>Cast & Contribution</h3>
          <p>Director: John Doe</p>
          <p>Actors: Jane Doe, Jack Smith, Emily Brown</p>
        </div>
      </div>
    </div>
  );
}

export default IndividualMovieInfo;