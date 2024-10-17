import React, { useState, useEffect, useRef } from 'react';
import { Search, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import '../styles/HomeScreen.css';
import placeholderPoster from '/Filmrent.png';

const HomeScreen = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoadingPopular, setIsLoadingPopular] = useState(true);
  const [isLoadingTopRated, setIsLoadingTopRated] = useState(true);
  
  const navigate = useNavigate();
  const popularMoviesRef = useRef(null);

  const apiOptions = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5Njk3MTFlMmFmMGViMGFlOThlYjAxNWQ3ZjNhNzA2YyIsIm5iZiI6MTcyODMwMDI1My40MzgwNiwic3ViIjoiNjM4Mzk3NjkyZTA2OTcwMjkyZTNiZWY1Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.D1iD3apoueoF_O9ai0Nni_tBuv411q4sUCKTfqavYm4'
    }
  };

  useEffect(() => {
    const fetchPopularMovies = async () => {
      try {
        const response = await fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', apiOptions);
        const data = await response.json();
        setPopularMovies(data.results.slice(0, 11));
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoadingPopular(false);
      }
    };
  
    const fetchTopRatedMovies = async () => {
      try {
        const response = await fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', apiOptions);
        const data = await response.json();
        setTopRatedMovies(data.results.slice(0, 10));
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoadingTopRated(false);
      }
    };

    fetchPopularMovies();
    fetchTopRatedMovies();
  }, []);

  useEffect(() => {
    const searchMovies = async () => {
      if (searchQuery.trim() === '') {
        setSearchResults([]);
        return;
      }
      try {
        const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(searchQuery)}&page=1`, apiOptions);
        const data = await response.json();
        setSearchResults(data.results.slice(0, 5));
      } catch (err) {
        console.error(err);
      }
    };

    const debounce = setTimeout(() => {
      searchMovies();
    }, 300);

    return () => clearTimeout(debounce);
  }, [searchQuery]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSeeAllMovies = () => {
    navigate('/movies');
  };

  const fetchDetailedMovieInfo = async (id) => {
    try {
      const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=969711e2af0eb0ae98eb015d7f3a706c&append_to_response=credits,videos`, apiOptions);
      const data = await response.json();
      return data;
    } catch (err) {
      console.error(err);
      return null;
    }
  };

  const handleMovieClick = async (movie) => {
    const detailedInfo = await fetchDetailedMovieInfo(movie.id);
    if (detailedInfo) {
      navigate(`/movie-info/${movie.id}`, { state: { mediaType: 'movie', mediaData: detailedInfo } });
    }
  };

  const scroll = (scrollOffset) => {
    if (popularMoviesRef.current) {
      popularMoviesRef.current.scrollLeft += scrollOffset;
    }
  };

  return (
    <div className="home-screen">
      <div className="welcome-section">
        <h1 className="welcome-title">Welcome to FilmRent</h1>
        <p className="welcome-text">
          Explore a world of movies and exclusive content-all in one place, ready to stream anytime, anywhere, on any device.
        </p>
        <div className="search-bar">
          <Search className="search-icon" size={20} />
          <input 
            type="text" 
            placeholder="Search for movies..." 
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
        {searchResults.length > 0 && (
          <div className="search-results">
            {searchResults.map((movie) => (
              <div 
                key={movie.id} 
                className="search-result-item"
                onClick={() => handleMovieClick(movie)}
              >
                <img 
                  src={movie.poster_path ? `https://image.tmdb.org/t/p/w92${movie.poster_path}` : placeholderPoster} 
                  alt={movie.title}
                  className="search-result-poster"
                />
                <span>{movie.title}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <section className="content-section">
        <div className="section-header">
          <h2 className="section-title">Popular Movies</h2>
        </div>
        <div className="thumbnail-container">
          <button className="scroll-btn scroll-left" onClick={() => scroll(-200)}>
            &lt;
          </button>
          <div className="thumbnail-list" ref={popularMoviesRef}>
            {isLoadingPopular ? (
              <p>Loading popular movies...</p>
            ) : (
              popularMovies.map((movie) => (
                <div 
                  key={movie.id} 
                  className="thumbnail-item"
                  onClick={() => handleMovieClick(movie)}
                >
                  <div className="thumbnail-image">
                    <img 
                      src={movie.poster_path ? `https://image.tmdb.org/t/p/w200${movie.poster_path}` : placeholderPoster} 
                      alt={movie.title}
                      className="media-poster"
                    />
                  </div>
                  <span className="thumbnail-label">{movie.title}</span>
                </div>
              ))
            )}
          </div>
          <button className="scroll-btn scroll-right" onClick={() => scroll(200)}>
            &gt;
          </button>
        </div>
      </section>

      <section className="content-section">
        <div className="section-header">
          <h2 className="section-title">Top Rated Movies</h2>
        </div>
        <div className="latest-grid">
          {isLoadingTopRated ? (
            <p>Loading top rated movies...</p>
          ) : (
            <>
              {topRatedMovies.slice(0, 2).map((movie) => (
                <div 
                  key={movie.id} 
                  className="grid-item large"
                  onClick={() => handleMovieClick(movie)}
                >
                  <div className="image-container">
                    <img 
                      src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : placeholderPoster} 
                      alt={movie.title}
                      className="latest-poster"
                    />
                  </div>
                  <span className="grid-item-label">{movie.title}</span>
                </div>
              ))}
              {topRatedMovies.slice(2, 10).map((movie) => (
                <div 
                  key={movie.id} 
                  className="grid-item"
                  onClick={() => handleMovieClick(movie)}
                >
                  <div className="image-container">
                    <img 
                      src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : placeholderPoster} 
                      alt={movie.title}
                      className="latest-poster"
                    />
                  </div>
                  <span className="grid-item-label">{movie.title}</span>
                </div>
              ))}
            </>
          )}
        </div>
      </section>

      <button className="explore-all-btn" onClick={handleSeeAllMovies}>
        Explore All Movies
        <ChevronRight size={20} />
      </button>
    </div>
  );
};

export default HomeScreen;