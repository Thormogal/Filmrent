import { useDispatch, useSelector } from "react-redux"
import { fetchMovies, fetchGenres, fetchSearchResults } from "../features/movieListSlice";
import { useEffect, useState } from "react";
import { debounce } from "lodash";

const useMoviesData = (query) => {
    const dispatch = useDispatch();
    const genres = useSelector((state) => state.movies.genres);
    const movies = useSelector((state) => state.movies.movies);
    const loading = useSelector((state) => state.movies.loading);
    const error = useSelector((state) => state.movies.error);
    const searchResults = useSelector((state) => state.movies.searchResults);
    
    useEffect(() => {
        dispatch(fetchGenres());
        dispatch(fetchMovies());
    }, [dispatch]);

   

    useEffect(() => {
        if (query) {
            dispatch(fetchSearchResults(query));
        }
    }, [query, dispatch]);


    return { genres, movies, loading, searchResults, error, query };
}

export default useMoviesData;