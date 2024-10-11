import '../CSS/moviecollection.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
// src\CSS\moviecollection.css
import { Search, } from 'lucide-react';
const MovieCollection = () => {

    return (
        <main className='moviesPage-container'>
            <header className='header'>
            </header>
            <div className="search-bar">
                <Search className="search-icon" size={20} />
                <input type="text" placeholder="Search for movies, series, and more..." />
            </div>


            <section className='filterMovieContainer'>
                <div className='filterList'>
                    <br></br>
                    <select className='filterSelect'>
                        <option>All genres</option>
                    </select>
                    <select>
                        <option>Sort by</option>
                    </select>
                </div>
                <div className='movielist-container'>
                    <div className='movieListItem'>
                        <img src='Filmrent.png' className='movieImage' />
                        <h3>Insidan ut</h3>
                        <div className='flexRatingYear'>
                            <img src='popcorn 3.png' className='popcornIcon' />
                            <span className='ratingYearTxt'>7.6 | 2024</span>
                        </div>
                    </div>
                    <div className='movieListItem'>
                        <img src='Filmrent.png' className='movieImage' />
                        <h3>Insidan ut</h3>
                        <div className='flexRatingYear'>
                            <img src='popcorn 3.png' className='popcornIcon' />
                            <span className='ratingYearTxt'>7.6 | 2024</span>
                        </div>
                    </div>
                    <div className='movieListItem'>
                        <img src='Filmrent.png' className='movieImage' />
                        <h3>Insidan ut</h3>
                        <div className='flexRatingYear'>
                            <img src='popcorn 3.png' className='popcornIcon' />
                            <span className='ratingYearTxt'>7.6 | 2024</span>
                        </div>
                    </div>
                    <div className='movieListItem'>
                        <img src='Filmrent.png' className='movieImage' />
                        <h3>Insidan ut</h3>
                        <div className='flexRatingYear'>
                            <img src='popcorn 3.png' className='popcornIcon' />
                            <span className='ratingYearTxt'>7.6 | 2024</span>
                        </div>
                    </div>
                    <div className='movieListItem'>
                        <img src='Filmrent.png' className='movieImage' />
                        <h3>Insidan ut</h3>
                        <div className='flexRatingYear'>
                            <img src='popcorn 3.png' className='popcornIcon' />
                            <span className='ratingYearTxt'>7.6 | 2024</span>
                        </div>
                    </div>
                    <div className='movieListItem'>
                        <img src='Filmrent.png' className='movieImage' />
                        <h3>Insidan ut</h3>
                        <div className='flexRatingYear'>
                            <img src='popcorn 3.png' className='popcornIcon' />
                            <span className='ratingYearTxt'>7.6 | 2024</span>
                        </div>
                    </div>
                    <div className='movieListItem'>
                        <img src='Filmrent.png' className='movieImage' />
                        <h3>Insidan ut</h3>
                        <div className='flexRatingYear'>
                            <img src='popcorn 3.png' className='popcornIcon' />
                            <span className='ratingYearTxt'>7.6 | 2024</span>
                        </div>
                    </div>
                    <div className='movieListItem'>
                        <img src='Filmrent.png' className='movieImage' />
                        <h3>Insidan ut</h3>
                        <div className='flexRatingYear'>
                            <img src='popcorn 3.png' className='popcornIcon' />
                            <span className='ratingYearTxt'>7.6 | 2024</span>
                        </div>
                    </div>
                    <div className='movieListItem'>
                        <img src='Filmrent.png' className='movieImage' />
                        <h3>Insidan ut</h3>
                        <div className='flexRatingYear'>
                            <img src='popcorn 3.png' className='popcornIcon' />
                            <span className='ratingYearTxt'>7.6 | 2024</span>
                        </div>
                    </div>


                </div>
            </section>
        </main>
    )
}

export default MovieCollection;