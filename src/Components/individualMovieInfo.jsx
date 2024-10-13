import React from 'react';
import '/src/CSS/individualMovieInfo.css';
import reviewIcon from '/reviewIcon.png';
import placeholderPoster from '/Filmrent.png';
import { useParams } from 'react-router-dom';
import useDetailedMovieData from '../hooks/useDetailedMovieData';
import isoLanguages from 'iso-639-1';



function IndividualMovieInfo() {
  const { movieId } = useParams();
  const { movie, loading, error } = useDetailedMovieData(movieId);

  const getFullLanguageName = (langCode) => {
    if (!langCode) return '';

    const fullLanguage = isoLanguages.getName(langCode);
    return fullLanguage ? fullLanguage.charAt(0).toUpperCase() + fullLanguage.slice(1) : langCode;
  };


  if (loading) {
    return <p>Loading movie data...</p>;
  }

  if (error) {
    return <p>Error fetching movie data: {error}</p>;
  }

  if (!movie) {
    return <p>No movie data found.</p>;
  }

  return (
    <div className="movie-layout-wrapper">
      <div className="movie-content-wrapper">
        <div className="movie-details-container">
          <div className="movie-title-container">
            <h1>{movie.title} <span className="movie-release-year">({new Date(movie.release_date).getFullYear()})</span></h1>
          </div>
          <img
            src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : placeholderPoster}
            alt={movie.title}
            className="movie-poster"
          />
          <div className="movie-price-container">
            <p>Price: 49 SEK</p> {/* Temporärt pris */}
          </div>
          <div className="movie-button-container">
            <button className="buy-button">Buy</button>
          </div>
        </div>

        <div className="movie-extra-info-container">
          <div className="movie-meta-info">
            <div className="movie-meta-left">
              <p>Genre: {movie.genres && movie.genres.map(genre => genre.name).join(', ')}</p>
              <p>Original Language: {getFullLanguageName(movie.original_language)}</p>
              <p>Playtime: {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}min</p>
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
            <p>{movie.overview}</p>
          </div>
          <div className="movie-cast">
            <h3>Cast & Contribution</h3>
            <p>Director: John Doe</p> {/* Placeholder */}
            <p>Actors: Jane Doe, Jack Smith, Emily Brown</p> {/* Placeholder */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default IndividualMovieInfo;