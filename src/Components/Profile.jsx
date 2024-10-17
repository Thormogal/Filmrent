import { useSelector, useDispatch } from "react-redux";
import { removeFromBoughtList, removeFromSavedList } from '../features/profile';
import React, { useState } from 'react';
import '../CSS/profile.css';
import {Link} from 'react-router-dom'
import movieImage from '../assets/Filmrent.png'
import { HeartOff } from 'lucide-react';
import TrailerModal from './trailerModal';
import { showToast } from "../features/toastSlice";




const Profile = () => {
    const dispatch = useDispatch();
    const trailer = "dQw4w9WgXcQ";

    const [showBoughtMovies, setShowBoughtMovies] = useState(false);
    const [showSavedMovies, setShowSavedMovies] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const boughtList = useSelector((state) => state.profile.boughtList) || [] ;
    const savedList = useSelector((state) => state.profile.savedList) || [] ;

    console.log(boughtList);
    
    const handleRemoveFavourite = (movie) => {
        const id = movie.id;
        const message = `${movie.title} was removed from favorites`;
        dispatch(removeFromSavedList(id));
        dispatch(showToast({showToast: true, message: message}));
    }
    const toggleBoughtMovies = () => {
        
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
                            boughtList.map((movie, index) => {
                                 const expiratonDate = new Date(movie.expirationDate);

                                const formattedTime = expiratonDate.toLocaleTimeString('sv-SE', {
                                    hour: '2-digit', 
                                    minute: '2-digit'});
                                const formattedDate = expiratonDate.toLocaleDateString('sv-SE', {
                                    day: '2-digit',
                                    month: '2-digit'
                                });

                                const now = new Date();

                                
                                const diffInMilliseconds = expiratonDate - now;
                                if (diffInMilliseconds < 0) {
                                    const id = movie.id;
                                    
                                    dispatch(removeFromBoughtList(id));
                                }
                                const diffInHours = Math.floor(diffInMilliseconds / (1000 * 60 * 60)); 
                                const diffInMinutes = Math.floor((diffInMilliseconds % (1000 * 60 * 60)) / (1000 * 60)); 

                                return (

                                <div key={index} className="bought-list">

                                        <img src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : movieImage} className='movieImage' onClick={() => setModalIsOpen(!modalIsOpen)}/>
                                        <div  className="expires-overlay">
                                        {diffInHours > 24 ? <p className="expires-overlay">Expires: {formattedDate}</p> : diffInHours > 12 ? <p>Expires: {diffInHours}h</p> : <p>Expires: {diffInHours}h {diffInMinutes}min</p>}
                                        </div>
                                        

                                </div>
                              

                            )})

                        ) : (
                            <p>No rented movies yet.</p>
                        )
                        }
                    </ul>
                
            </section>

            <section>
               
                <p>Saved Movies</p>
                    <ul>
                        {savedList.length > 0 ? (
                            savedList.map((movie, index) => (
                                <li key={movie.movieID || index} className="favourite-list">
                                    <HeartOff onClick={() => handleRemoveFavourite(movie)} className="favourite-overlay"/>
                                    
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