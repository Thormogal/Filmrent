import React, { useState, useEffect } from 'react';
import { Search, ChevronRight } from 'lucide-react';
import '../styles/HomeScreen.css';

const HomeScreen = () => {
  const [trendingMedia, setTrendingMedia] = useState([]);
  const [latestShows, setLatestShows] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoadingTrending, setIsLoadingTrending] = useState(true);
  const [isLoadingLatest, setIsLoadingLatest] = useState(true);

  const apiOptions = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5Njk3MTFlMmFmMGViMGFlOThlYjAxNWQ3ZjNhNzA2YyIsIm5iZiI6MTcyODMwMDI1My40MzgwNiwic3ViIjoiNjM4Mzk3NjkyZTA2OTcwMjkyZTNiZWY1Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.D1iD3apoueoF_O9ai0Nni_tBuv411q4sUCKTfqavYm4'
    }
  };

  useEffect(() => {
    const fetchTrendingMedia = async () => {
      try {
        const response = await fetch('https://api.themoviedb.org/3/trending/all/day?language=en-US', apiOptions);
        const data = await response.json();
        setTrendingMedia(data.results.slice(0, 9));
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoadingTrending(false);
      }
    };

    const fetchLatestShows = async () => {
      try {
        const response = await fetch('https://api.themoviedb.org/3/tv/popular?language=en-US&page=1', apiOptions);
        const data = await response.json();
        setLatestShows(data.results.slice(0, 10));
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoadingLatest(false);
      }
    };

    fetchTrendingMedia();
    fetchLatestShows();
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

  return (
    <div className="home-screen">
      <div className="welcome-section">
        <h1 className="welcome-title">Welcome to FilmRent</h1>
        <p className="welcome-text">
          Explore a world of movies, series, and exclusive content—all in one place, ready to stream anytime, anywhere, on any device.
        </p>
        <div className="search-bar">
          <Search className="search-icon" size={20} />
          <input 
            type="text" 
            placeholder="Search for movies, series, and more..." 
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
        {searchResults.length > 0 && (
          <div className="search-results">
            {searchResults.map((movie) => (
              <div key={movie.id} className="search-result-item">
                <img 
                  src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`} 
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
          <h2 className="section-title">Trending Now</h2>
          <button className="see-all-btn">See All <ChevronRight size={20} /></button>
        </div>
        <div className="thumbnail-list">
          {isLoadingTrending ? (
            <p>Loading trending media...</p>
          ) : (
            trendingMedia.map((item) => (
              <div key={item.id} className="thumbnail-item">
                <div className="thumbnail-image">
                  <img 
                    src={`https://image.tmdb.org/t/p/w200${item.poster_path}`} 
                    alt={item.title || item.name}
                    className="media-poster"
                  />
                </div>
                <span className="thumbnail-label">{item.title || item.name}</span>
              </div>
            ))
          )}
        </div>
      </section>

      <section className="content-section">
        <div className="section-header">
          <h2 className="section-title">Latest</h2>
          <button className="see-all-btn">See All <ChevronRight size={20} /></button>
        </div>
        <div className="latest-grid">
          {isLoadingLatest ? (
            <p>Loading latest shows...</p>
          ) : (
            <>
              {latestShows.slice(0, 2).map((show) => (
                <div key={show.id} className="grid-item large">
                  <div className="image-container">
                    <img 
                      src={`https://image.tmdb.org/t/p/w500${show.poster_path}`} 
                      alt={show.name}
                      className="latest-poster"
                    />
                  </div>
                  <span className="grid-item-label">{show.name}</span>
                </div>
              ))}
              {latestShows.slice(2, 10).map((show) => (
                <div key={show.id} className="grid-item">
                  <div className="image-container">
                    <img 
                      src={`https://image.tmdb.org/t/p/w500${show.poster_path}`} 
                      alt={show.name}
                      className="latest-poster"
                    />
                  </div>
                  <span className="grid-item-label">{show.name}</span>
                </div>
              ))}
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default HomeScreen;