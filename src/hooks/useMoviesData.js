import { useDispatch, useSelector } from "react-redux"
import { fetchMovies, fetchGenres, fetchSearchResults } from "../features/movieListSlice";
import { useEffect, useState } from "react";
import { debounce } from "lodash";

const useMoviesData = () => {

    const [inputText, setInputText] = useState('');
    const [genreId, setGenreId] = useState('');
    const [selectedSortValue, setSelectedSortValue] = useState();
    const [page, setPage] = useState(1);
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
            setPage(1);
            dispatch(fetchSearchResults({ query: inputText, genreId: '' , sortValue: '', page: 1}));
        }
    }

    const handleGenreChange = (e) => {
        const selectedGenreId = e.target.value;
        setGenreId(selectedGenreId);
        setPage(1);
        if (selectedGenreId) {
            dispatch(fetchSearchResults({ query: inputText, genreId: selectedGenreId , sortValue : selectedSortValue, page : 1}));
        }
    };
    const handleSortChange = (e) => {
        const selectedSortedValue = e.target.value;
        setSelectedSortValue(selectedSortedValue);
        setPage(1);
            dispatch(fetchSearchResults({ query: inputText, genreId: genreId, sortValue: selectedSortedValue, page : 1 }));
    };
    const handleShowMore = () => {
        const nextPage = page + 1;
        setPage(nextPage);
        if(inputText ||genreId || selectedSortValue) {
           dispatch(fetchSearchResults({ query: inputText, genreId: genreId, sortValue: selectedSortValue, page: nextPage }));
        
        } else {
             dispatch(fetchMovies(nextPage));
           
        }
        
    }
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
         handleShowMore,
          inputText, 
          setInputText, 
          genreId,
        selectedSortValue,
    };
}

export default useMoviesData;