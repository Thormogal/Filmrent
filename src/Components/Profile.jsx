import { useSelector, useDispatch } from "react-redux";
import { removeFromBoughtList, removeFromSavedList } from '../features/profile';
import React, { useState } from 'react';
import '../CSS/profile.css';
import {Link} from 'react-router-dom'
import movieImage from '../assets/Filmrent.png'
import { HeartOff } from 'lucide-react';
import TrailerModal from './trailerModal';




const Profile = () => {
    const dispatch = useDispatch();
    const trailer = "dQw4w9WgXcQ";

    const [showBoughtMovies, setShowBoughtMovies] = useState(false);
    const [showSavedMovies, setShowSavedMovies] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const boughtList = useSelector((state) => state.profile.boughtList) || [] ;
    const savedList = useSelector((state) => state.profile.savedList) || [] ;

    
    const handleRemoveFavourite = (movie) => {
        const id = movie.id;
        
        dispatch(removeFromSavedList(id));
    }
    const toggleBoughtMovies = () => {
        console.log(boughtList);
        setShowBoughtMovies((prev) => !prev);
    };

    const toggleSavedMovies = () => {
        setShowSavedMovies((prev) => !prev);
    };

    return (

        <div className="profile">
            <h1>Welcome to your profile</h1>

            <section>
                <p>Rented Movies</p>
                    <ul>
                        {boughtList.length > 0 ? (
                            boughtList.map((movie, index) => (

                                <div key={index}>
                                   
                                        <img src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : movieImage} 
                                        className='movieImage' 
                                        onClick={() => setModalIsOpen(!modalIsOpen)}
                                        />
                                    
                                </div>
                                // <li key={movie.movieID || index}>
                                //     <strong>{movie.title}</strong> - Price: ${movie.price}
                                // </li>

                            ))

                        ) : (
                            <p>No rented movies yet.</p>
                        )
                        }
                    </ul>
                {/* )} */}
            </section>

            <section>
                {/* <button onClick={toggleSavedMovies}>
                    {showSavedMovies ? 'Hide Saved Movies' : 'Show Saved Movies'}
                </button>
                {showSavedMovies && ( */}
                <p>Saved Movies</p>
                    <ul>
                        {savedList.length > 0 ? (
                            savedList.map((movie, index) => (
                                <li key={movie.movieID || index}>
                                    <HeartOff onClick={() => handleRemoveFavourite(movie)}/>
                                    {/* <strong>{movie.title}</strong> - Price: ${movie.price} */}
                                    <Link to={`/movie-info/${movie.id}`} >
                                        
                                <img src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : movieImage} 
                                className='movieImage' />

                            </Link>
                                </li>

                            ))

                        ) : (
                            <p>No saved movies yet.</p>
                        )
                        }
                    </ul>
                {/* )} */}
            </section>
            <TrailerModal
          isOpen={modalIsOpen}
          trailerKey={trailer}
          onClose={() => setModalIsOpen(false)}
        />
        </div>
    );
};

export default Profile;