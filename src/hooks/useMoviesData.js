import { useDispatch, useSelector } from "react-redux"
import { fetchMovies, fetchGenres, fetchSearchResults } from "../features/movieListSlice";
import { useEffect, useState } from "react";
import { debounce } from "lodash";

const useMoviesData = () => {

    const [inputText, setInputText] = useState('');
    const [genreId, setGenreId] = useState('');
    const [selectedSortValue, setSelectedSortValue] = useState();
    const dispatch = useDispatch();
    const genres = useSelector((state) => state.movies.genres);
    const movies = useSelector((state) => state.movies.movies);
    const loading = useSelector((state) => state.movies.loading);
    const error = useSelector((state) => state.movies.error);
    const searchResults = useSelector((state) => state.movies.searchResults);
    const sortOptions = [
        {
        id: 'popularity.desc',
        name: 'Popularity - High to low'
    },
    
    {
        id: 'vote_count.desc',
        name: 'Vote count - High to low'
    },
    {
        id: 'release_date.desc',
        name: 'Release date - High to low'
    },
    {
        id: 'popularity.asc',
        name: 'Popularity - Low to high'
    },
    {
        id: 'release_date.asc',
        name: 'Release date - Low to high'
    } ]
    useEffect(() => {
        dispatch(fetchGenres());
        dispatch(fetchMovies());
    }, [dispatch]);
    
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            setGenreId('');
            setSelectedSortValue('');
            dispatch(fetchSearchResults({ query: inputText, genreId: '' , sortValue: ''}));
        }
    }

    const handleGenreChange = (e) => {
        const selectedGenreId = e.target.value;
        setGenreId(selectedGenreId);
        if (selectedGenreId) {
            dispatch(fetchSearchResults({ query: inputText, genreId: selectedGenreId , sortValue : selectedSortValue}));
        }
    };
    const handleSortChange = (e) => {
        const selectedSortedValue = e.target.value;
        setSelectedSortValue(selectedSortedValue);
            dispatch(fetchSearchResults({ query: inputText, genreId: genreId, sortValue: selectedSortedValue }));
    };
    return { 
        genres,
         movies, 
         loading,
          searchResults,
           error, 
           sortOptions, 
        handleKeyDown, 
        handleGenreChange,
         handleSortChange,
          inputText, 
          setInputText, 
          genreId,
        selectedSortValue,
    };
}

export default useMoviesData;