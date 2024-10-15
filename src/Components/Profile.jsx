import { useSelector, useDispatch } from "react-redux";
import { removeFromBoughtList, removeFromSavedList } from '../features/profile';
import React, { useState } from 'react';



const Profile = () => {
    const dispatch = useDispatch();

    const [showBoughtMovies, setShowBoughtMovies] = useState(false);
    const [showSavedMovies, setShowSavedMovies] = useState(false);

    const boughtList = useSelector((state) => state.profile.boughtList) || [] ;
    const savedList = useSelector((state) => state.profile.savedList) || [] ;


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
                <button onClick={toggleBoughtMovies}>
                    {showBoughtMovies ? 'Hide Rented Movies' : 'Show Rented Movies'}
                </button>
                {showBoughtMovies && (
                    <ul>
                        {boughtList.length > 0 ? (
                            boughtList.map((movie, index) => (

                                <li key={movie.movieID || index}>
                                    <strong>{movie.title}</strong> - Price: ${movie.price}
                                </li>

                            ))

                        ) : (
                            <p>No rented movies yet.</p>
                        )
                        }
                    </ul>
                )}
            </section>

            <section>
                <button onClick={toggleSavedMovies}>
                    {showSavedMovies ? 'Hide Saved Movies' : 'Show Saved Movies'}
                </button>
                {showSavedMovies && (
                    <ul>
                        {savedList.lenght > 0 ? (
                            savedList.map((movie, index) => (
                                <li key={movie.movieID || index}>
                                    <strong>{movie.title}</strong> - Price: ${movie.price}
                                </li>

                            ))

                        ) : (
                            <p>No saved movies yet.</p>
                        )
                        }
                    </ul>
                )}
            </section>
        </div>
    );
};

export default Profile;