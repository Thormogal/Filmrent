import React, { useState } from 'react';
import '/src/CSS/individualMovieInfo.css';
import '/src/CSS/priceStyles.css';
import reviewIcon from '/reviewIcon.png';
import placeholderPoster from '/Filmrent.png';
import useDetailedMovieData from '../hooks/useDetailedMovieData';
import isoLanguages from 'iso-639-1';
import TrailerModal from '/src/Components/trailerModal.jsx';

import { useDispatch, useSelector } from 'react-redux';
import { addToCart, setMessage, setShowToast } from '../features/cart';
import { calculatePrice } from '../utils/priceCalculator.js';
import {Link} from 'react-router-dom';

import { useParams } from 'react-router-dom';



import { addToSavedList } from '../features/profile.js';


function IndividualMovieInfo() {

  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const { movieId } = useParams();
  const { movie, credits, trailer, loading, error } = useDetailedMovieData(movieId);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [showReleaseDate, setShowReleaseDate] = useState(false);
  const [showRatingDetails, setShowRatingDetails] = useState(false);

  const toggleRatingDetails = () => {
    setShowRatingDetails(!showRatingDetails);
  };

  const getFullLanguageName = (langCode) => {
    if (!langCode) return 'Unknown';
    const fullLanguage = isoLanguages.getName(langCode);
    return fullLanguage ? fullLanguage.charAt(0).toUpperCase() + fullLanguage.slice(1) : 'Unknown';
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

  const releaseYear = movie.release_date ? new Date(movie.release_date).getFullYear() : 'Unknown';
  const formattedReleaseDate = movie.release_date
    ? new Date(movie.release_date).toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' })
    : 'Unknown';

  const { fullPrice, discountPrice, isAnniversary, discount } = calculatePrice(movie.release_date);

  const handleBuy = () => {
    let movieToBuy = {
      ...movie,
      fullPrice: fullPrice,
      discount: discount,
      ...(isAnniversary && { discount: 10 }),
      finalPrice: isAnniversary ? fullPrice - 10 : fullPrice
    };
    const message = `${movie.title} added to cart.`;
    dispatch(addToCart({movieToBuy, message}));
    // dispatch(calculateCart());
    
  };

  const handleAddToFavorites = () => {
    // const movieToSave = {
    //   movieID: movie.id,
    //   title: movie.title,
    //   price: fullPrice
    // };
    let movieToSave = {
      ...movie,
      fullPrice: fullPrice,
      discount: discount,
      ...(isAnniversary && { discount: 10 }),
      finalPrice: isAnniversary ? fullPrice - 10 : fullPrice
    };
    dispatch(addToSavedList(movieToSave));

    alert(`${movie.title} has been added to your favorites!`);
  };

  return (
    <div className="movie-layout-wrapper">
      <div className="movie-content-wrapper">
        <div className="movie-details-container">
          <div className="movie-title-container">
            <h1>
              {movie.title}
              <span
                className="movie-release-year showReleaseDate"
                onClick={() => setShowReleaseDate(!showReleaseDate)}
                onMouseDown={(e) => e.preventDefault()}
                style={{ cursor: 'pointer', color: 'light-grey' }}
              >
                ({releaseYear})
              </span>
            </h1>
            {showReleaseDate && (
              <div className="release-date-popup">
                {new Date(movie.release_date) < new Date() ? (
                  <p>Released on {formattedReleaseDate}</p>
                ) : (
                  <p>Releases on {formattedReleaseDate}</p>
                )}
              </div>
            )}
          </div>


          <img
            src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : placeholderPoster}
            alt={movie.title}
            className="movie-poster"
          />


          <div className="movie-price-container">
            {isAnniversary ? (
              <>
                <span className="original-price"><s>${fullPrice.toFixed(2)}</s></span>
                <span className="discount-price">${discountPrice.toFixed(2)}</span>
                <span className="anniversary-discount">Anniversary Discount Applied!</span>
              </>
            ) : (
              <span>${fullPrice.toFixed(2)}</span>
            )}
          </div>


          <div className="movie-button-container">
            {cart.cart.some(item => item.id === movie.id) 
              ? (<Link to="/checkout"><button className="buy-button">Go to Checkout</button></Link>) 
              : (<button className="buy-button" onClick={handleBuy}>Buy</button>)
            }
            
          </div>
        </div>


        <div
          className="movie-extra-info-container"
          style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w780${movie.backdrop_path})` }}
        >
          <div className="movie-meta-info">
            <div className="movie-meta-left">
              <div className="movie-characteristics">
                <div className="movie-genre">
                  <strong>Genre:</strong> <span>{movie.genres && movie.genres.length > 0 ? movie.genres.map(genre => genre.name).join(', ') : 'Unknown'}</span>
                </div>


                <div className="movie-language">
                  <strong>Language:</strong>
                  <span>{getFullLanguageName(movie.original_language)}</span>
                </div>


                {movie.spoken_languages && movie.spoken_languages.length > 1 && (
                  <div className="movie-additional-languages">
                    <strong>Secondary Languages:</strong>
                    <span>
                      {movie.spoken_languages
                        .filter(lang => lang.iso_639_1 !== movie.original_language)
                        .map(lang => lang.name).join(', ') || 'None'}
                    </span>
                  </div>
                )}


                <div className="movie-runtime">
                  <strong>Runtime:</strong> <span>{movie.runtime ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}min` : 'Unknown'}</span>
                </div>
              </div>
            </div>


            <div className="movie-review-and-buttons">
              <div className="review-icon" onClick={toggleRatingDetails}>
                <img src={reviewIcon} alt="Review Icon" className="review-icon-img" />
                <p className="movie-rating" onClick={toggleRatingDetails}>
                  {movie.vote_average ? `${movie.vote_average.toFixed(1)}` : 'No rating available'}
                  {showRatingDetails && (
                    <span className="rating-details">
                      <br />
                      Votes: {movie.vote_count || 'N/A'}
                    </span>
                  )}
                </p>
              </div>


              <div className="movie-button-wrapper">
                <button className="trailer-button" onClick={() => setModalIsOpen(true)}>
                  <i className="fas fa-play play-icon"></i> Watch Trailer
                </button>
                <button className="favorite-button" onClick={handleAddToFavorites}>
                  <i className="fas fa-heart"></i> Add to Favorites
                </button>
              </div>
            </div>
          </div>


          <div className="movie-description">
            <h2>Movie Description</h2>
            <p>{movie.overview ? movie.overview : 'No description available.'}</p>
          </div>


          <div className="movie-cast">
            <h3>Cast & Contribution</h3>
            <div className="movie-characteristics">
              <div className="movie-director">
                <strong>Director:</strong> <span>{credits && credits.crew ? credits.crew.filter(crew => crew.job === 'Director').map(d => d.name).join(', ') : 'N/A'}</span>
              </div>
              <div className="movie-actors">
                <strong>Actors:</strong> <span>{credits && credits.cast ? credits.cast.slice(0, 5).map(actor => actor.name).join(', ') : 'N/A'}</span>
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
