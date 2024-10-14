import '../CSS/moviecollection.css';
import {  Search } from 'lucide-react';
import popcornIcon from '../assets/popcorn.ico'
import movieImage from '../assets/Filmrent.png'
import { useEffect, useState } from 'react';
import useMoviesData from '../hooks/useMoviesData';
import {  Link } from 'react-router-dom';


const MovieCollection = () => {

    const { genres, movies, loading, error } = useMoviesData();
    
    if (loading) {
        return <div>Loading...</div>
    }
    if (error) {
        return <div>Error: {error}</div>
    }
    const trimRatingNumber = (number) => {
        const trimmedNumber = parseFloat(number.toFixed(1));
        return trimmedNumber;
    }
    const extractYear = (date) => {
        const year = new Date(date).getFullYear();
        return year;
    } 
    return (
        <main className='moviesPage-container'>
            <div className="search-barMovie">
                <Search className="search-iconMovie" size={20} />
                <input type="text" placeholder="Search for movies, series, and more..." />
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
                    {movies.map((movie) => (
                        <div key={movie.id} className='movieListItem'>
                            <Link to={`/movie-info/${movie.id}`} className='movieLink'>
                            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} className='movieImage' />
                            </Link>
                           
                            <div className='flexRatingYear'>
                                <img src={popcornIcon} alt="Popcorn icon" className='popcornIcon' />
                                <span className='ratingYearTxt'>{trimRatingNumber(movie.vote_average)} | {extractYear(movie.release_date)}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    )
}

export default MovieCollection;