import '../CSS/moviecollection.css';
import { Search } from 'lucide-react';
import popcornIcon from '../assets/popcorn.ico'
import movieImage from '../assets/Filmrent.png'
import { useEffect, useRef, useState } from 'react';
import useMoviesData from '../hooks/useMoviesData';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchSearchResults } from '../features/movieListSlice';



const MovieCollection = () => {

    const [inputText, setInputText] = useState('');
    const [genreId, setGenreId] = useState('');
    const { genres, movies, searchResults, loading, error } = useMoviesData();
    // const [query, setQuery] = useState('');

    const dispatch = useDispatch();

    const handleKeyDown= (e) => {
        if(e.key === 'Enter') {
            setGenreId('');
            dispatch(fetchSearchResults({ query: inputText, genreId : '' }));
        }
    } 

    const handleGenreChange = (e) => {
        const selectedGenreId = e.target.value;
        setGenreId(selectedGenreId);
        if (selectedGenreId) {
            dispatch(fetchSearchResults({ query: inputText, genreId: selectedGenreId }));
        }
    };

    if (loading) {
        return <div>Loading...</div>
    }
    if (error) {
        return <div>Error: {error}</div>
    }
    const trimRatingNumber = (number) => parseFloat(number.toFixed(1));
    const extractYear = (date) => new Date(date).getFullYear();

    return (
        <main className='moviesPage-container'>
            <div className="search-barMovie">
                <Search className="search-iconMovie" size={20}  />
                <input type="text" value={inputText} placeholder="Search for movies, series, and more..." onChange={e => setInputText(e.target.value)} id='inputText' onKeyDown={handleKeyDown}  />
            </div>

            <section className='filterMovieContainer'>
                <div className='filterList'>
                    <br></br>
                    <select className='filterSelect' value={genreId} onChange={handleGenreChange} >
                        <option value="">All genres</option>
                        {genres.map((genre) => (
                            <option key={genre.id} value={genre.id}>{genre.name}</option>
                        ))}
                    </select>
                    <select>
                        <option>Sort by</option>
                    </select>
                </div>
                <div className='movielist-container'>
                {(searchResults.length > 0 ? searchResults : movies).map((movie) => (
                        <div key={movie.id} className='movieListItem'>
                            <Link to={`/movie-info/${movie.id}`} className='movieLink'>
                                <img src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : movieImage} className='movieImage' />
                            </Link>

                            <div className='flexRatingYear'>
                                <img src={popcornIcon} alt="Popcorn icon" className='popcornIcon' />
                                <span className='ratingYearTxt'>{trimRatingNumber(movie.vote_average)} | {movie.release_date ? extractYear(movie.release_date) : "Unknown"}</span>
                            </div>
                        </div>
                    ))}
                </div>
                <button className='buttonShow'>Show more</button>
            </section>
            
        </main>
    )
}

export default MovieCollection;