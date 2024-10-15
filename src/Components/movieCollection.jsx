import '../CSS/moviecollection.css';
import {  Search } from 'lucide-react';
import popcornIcon from '../assets/popcorn.ico'
import movieImage from '../assets/Filmrent.png'
import { useEffect, useRef, useState } from 'react';
import useMoviesData from '../hooks/useMoviesData';
import {  Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchSearchResults } from '../features/movieListSlice';



const MovieCollection = () => {

    const [inputText, setInputText] = useState('');
    const { genres, movies, searchResults, loading, error } = useMoviesData();
    const [query, setQuery] = useState('');
    const dispatch = useDispatch();
    const handleKeyDown = (e) => {
        if(e.key === 'Enter' ) {
            // setQuery(inputText);
            dispatch(fetchSearchResults(inputText));
        } 
    }

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
                <Search className="search-iconMovie" size={20} />
                <input type="text" value={inputText} placeholder="Search for movies, series, and more..." onChange={e => setInputText(e.target.value)} id='inputText' onKeyDown={handleKeyDown} />
            </div>

            <section className='filterMovieContainer'>
                <div className='filterList'>
                    <br></br>
                    <select className='filterSelect'>
                        <option value="">All movies</option>
                        {genres.map((genre) => (
                            <option key={genre.id} value={genre.name}>{genre.name}</option>
                        ))}
                    </select>
                    <select>
                        <option>Sort by</option>
                    </select>
                </div>
                <div className='movielist-container'>
                    {(inputText.length > 0 ? searchResults : movies).map((movie) => (
                        <div key={movie.id} className='movieListItem'>
                            <Link to={`/movie-info/${movie.id}`} className='movieLink'>
                            <img src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`: movieImage} className='movieImage' />
                            </Link>
                           
                            <div className='flexRatingYear'>
                                <img src={popcornIcon} alt="Popcorn icon" className='popcornIcon' />
                                <span className='ratingYearTxt'>{trimRatingNumber(movie.vote_average)} | {movie.release_date ? extractYear(movie.release_date) : "Unknown"}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    )
}

export default MovieCollection;