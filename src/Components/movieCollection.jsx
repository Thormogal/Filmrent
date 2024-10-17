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

    const { genres, movies, searchResults, loading, error , sortOptions, handleKeyDown, handleGenreChange, handleSortChange, handleShowMore, inputText, setInputText, genreId, selectedSortValue } = useMoviesData();

    const dispatch = useDispatch();

    if (loading) {
        return <div>Loading...</div>
    }
    if (error) {
        return <div>Error: {error}</div>
    }
    const trimRatingNumber = (number) => Number(number.toFixed(1));
    const extractYear = (date) => new Date(date).getFullYear();

    return (
        <main className='moviesPage-container'>
            <div className="search-barMovie">
                <Search className="search-iconMovie" size={20} />
                <input type="text" value={inputText} placeholder="Search for movies..." onChange={e => setInputText(e.target.value)} id='inputText' onKeyDown={handleKeyDown} />
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
                    <select value={selectedSortValue} onChange={handleSortChange}>
                        <option value="">Sort by</option>
                        {sortOptions.map((option)=> (
                            <option key={option.id} value={option.id}>{option.name}</option>
                        )
                        )}
                        
                    </select>
                </div>
                <div className='movielist-container'>
                    {(searchResults.length > 0 ? searchResults : movies).map((movie) => (
                        <div key={movie.id} className='movieListItem'>
                            <Link to={`/movie-info/${movie.id}`} className='movieLink'>
                                <img className='movieListImage' src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : movieImage} />
                            </Link>

                            <div className='flexRatingYear'>
                                <img src={popcornIcon} alt="Popcorn icon" className='popcornIcon' />
                                <span className='ratingYearTxt'>{ movie.vote_average ? trimRatingNumber(movie.vote_average): "0"} | {movie.release_date ? extractYear(movie.release_date) : "Unknown"}</span>
                            </div>
                        </div>
                    ))}
                </div>
                <button className='buttonShow' onClick={handleShowMore}>Show more</button>
            </section>

        </main>
    )
}

export default MovieCollection;