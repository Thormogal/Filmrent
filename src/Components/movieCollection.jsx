import '../CSS/moviecollection.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Search, } from 'lucide-react';
import popcornIcon from '../assets/popcorn.ico'
import movieImage from '../assets/Filmrent.png'
import { useEffect, useState } from 'react';


export const fetchGenres = async () => {
    const API_KEY = import.meta.env.VITE_API_KEY;
    const response = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`);
    if (!response.ok) {
        const error = await response.text();
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    console.log('data',data)
    return data.genres;
};

const MovieCollection = () => {

    const [genres, setGenres] = useState([]);

    useEffect(() => {
        const getGenres = async () => {
            try {
                const genresData = await fetchGenres();
                setGenres(genresData);
            } catch (error) {
                console.error('Error fetching genres:', error);
            }
        };
        getGenres(); 
    }, []);
    return (
        <main className='moviesPage-container'>
            <div className="search-bar">
                <Search className="search-icon" size={20} />
                <input type="text" placeholder="Search for movies, series, and more..." />
            </div>


            <section className='filterMovieContainer'>
                <div className='filterList'>
                    <br></br>
                    <select className='filterSelect'>
                        {genres.map((genre) => (
                            <option key={genre.id} value={genre.name} />
                        ))}
                    </select>
                    <select>
                        <option>Sort by</option>
                    </select>
                </div>
                <div className='movielist-container'>
                    <div className='movieListItem'>
                        <img src={movieImage} className='movieImage' />
                        <h3>Insidan ut</h3>
                        <div className='flexRatingYear'>
                            <img src={popcornIcon} alt="Popcorn icon" className='popcornIcon' />
                            <span className='ratingYearTxt'>7.6 | 2024</span>
                        </div>
                    </div>
                    <div className='movieListItem'>
                        <img src={movieImage} className='movieImage' />
                        <h3>Insidan ut</h3>
                        <div className='flexRatingYear'>
                            <img src={popcornIcon} alt="Popcorn icon" className='popcornIcon' />
                            <span className='ratingYearTxt'>7.6 | 2024</span>
                        </div>
                    </div>
                    <div className='movieListItem'>
                        <img src={movieImage} className='movieImage' />
                        <h3>Insidan ut</h3>
                        <div className='flexRatingYear'>
                            <img src={popcornIcon} alt="Popcorn icon" className='popcornIcon' />
                            <span className='ratingYearTxt'>7.6 | 2024</span>
                        </div>
                    </div>
                    <div className='movieListItem'>
                        <img src={movieImage} className='movieImage' />
                        <h3>Insidan ut</h3>
                        <div className='flexRatingYear'>
                            <img src={popcornIcon} alt="Popcorn icon" className='popcornIcon' />
                            <span className='ratingYearTxt'>7.6 | 2024</span>
                        </div>
                    </div>
                    <div className='movieListItem'>
                        <img src={movieImage} className='movieImage' />
                        <h3>Insidan ut</h3>
                        <div className='flexRatingYear'>
                            <img src={popcornIcon} alt="Popcorn icon" className='popcornIcon' />
                            <span className='ratingYearTxt'>7.6 | 2024</span>
                        </div>
                    </div>
                    <div className='movieListItem'>
                        <img src={movieImage} className='movieImage' />
                        <h3>Insidan ut</h3>
                        <div className='flexRatingYear'>
                            <img src={popcornIcon} alt="Popcorn icon" className='popcornIcon' />
                            <span className='ratingYearTxt'>7.6 | 2024</span>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default MovieCollection;