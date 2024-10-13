import { useDispatch, useSelector } from "react-redux"
import { fetchMovies, fetchGenres } from "../features/movieListSlice";
import { useEffect } from "react";


const useMoviesData = () => {
    const dispatch = useDispatch();
    const genres = useSelector((state) => state.movies.genres);
    const movies = useSelector((state) => state.movies.movies);
    const loading = useSelector((state) => state.movies.loading);
    const error = useSelector((state) => state.movies.error);

    useEffect(() => {
        dispatch(fetchGenres());
        dispatch(fetchMovies());
    }, [dispatch]);

    return {genres, movies, loading, error };
}

export default useMoviesData;