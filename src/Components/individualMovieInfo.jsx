import React, { useState } from 'react';
import '/src/CSS/individualMovieInfo.css';
import reviewIcon from '/reviewIcon.png';
import placeholderPoster from '/Filmrent.png';
import { useParams } from 'react-router-dom';
import useDetailedMovieData from '../hooks/useDetailedMovieData';
import isoLanguages from 'iso-639-1';
import TrailerModal from '/src/Components/trailerModal.jsx';

function IndividualMovieInfo() {
  const { movieId } = useParams();
  const { movie, credits, trailer, loading, error } = useDetailedMovieData(movieId);
  const [modalIsOpen, setModalIsOpen] = useState(false);

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

  const directors = credits ? credits.crew.filter((person) => person.job === 'Director').map((director) => director.name).join(', ') : 'Unknown Director';
  const actors = credits ? credits.cast.slice(0, 5).map((actor) => actor.name).join(', ') : 'Unknown Actors';
  const movieRating = movie.vote_average ? Math.round(movie.vote_average * 10) / 10 : 0;

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
              <div className="movie-characteristics">
                <div className="movie-genre">
                  <strong>Genre:</strong> <span>{movie.genres && movie.genres.map(genre => genre.name).join(', ')}</span>
                </div>
                <div className="movie-language">
                  <strong>Language:</strong> <span>{getFullLanguageName(movie.original_language)}</span>
                </div>
                <div className="movie-runtime">
                  <strong>Runtime:</strong> <span>{Math.floor(movie.runtime / 60)}h {movie.runtime % 60}min</span>
                </div>
              </div>
            </div>

            <div className="movie-review-and-buttons">
              <div className="review-icon">
                <img src={reviewIcon} alt="Review Icon" className="review-icon-img" />
                <p className="movie-rating">{movieRating} / 10</p>
              </div>
              <div className="movie-button-wrapper">
                <button className="trailer-button" onClick={() => setModalIsOpen(true)}>
                  <i className="fas fa-play play-icon"></i> Watch Trailer
                </button>
                <button className="favorite-button">
                  <i className="fas fa-heart"></i> Add to Favorites
                </button>
              </div>
            </div>
          </div>

          <div className="movie-description">
            <h2>Movie Description</h2>
            <p>{movie.overview}</p>
          </div>

          <div className="movie-cast">
            <h3>Cast & Contribution</h3>
            <div className="movie-characteristics">
              <div className="movie-director">
                <strong>Director:</strong> <span>{directors}</span>
              </div>
              <div className="movie-actors">
                <strong>Actors:</strong> <span>{actors}</span>
              </div>
            </div>
          </div>
        </div>

        <TrailerModal
          isOpen={modalIsOpen}
          trailerKey={trailer}
          onClose={() => setModalIsOpen(false)}
        />
      </div>
    </div>
  );
}

export default IndividualMovieInfo;
