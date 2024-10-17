import axios from "axios"
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"


const apiUrl = import.meta.env.VITE_API_URL;
const apiKey = import.meta.env.VITE_API_KEY;

const initialState = {
    genres: [],
    movies: [],
    searchResults: [],
    loading: false,
    error: null,
}

export const fetchGenres = createAsyncThunk('movies/fetchGenres', async () => {
    const response = await axios.get(`${apiUrl}/genre/movie/list?api_key=${apiKey}`)
    return response.data.genres;
})

export const fetchMovies = createAsyncThunk('movies/fetchMovies', async (page = 1) => {
    const pageString = `&page=${page}`; 
    const response = await axios.get(`${apiUrl}/discover/movie?api_key=${apiKey}${pageString}`)
    console.log("movies", response.data.results);
    console.log("fetchMovies, page:", page);
    return response.data.results;
})
export const fetchSearchResults = createAsyncThunk('movies/fetchSearchResults', async ({ query, genreId, sortValue, page = 1 }) => {
    const queryString = query ? `&query=${encodeURIComponent(query)}` : '';
    const genreString = genreId ? `&with_genres=${genreId}` : '';
    const sortString = sortValue ? `&sort_by=${sortValue}` : '';
    const pageString = `&page=${page}`;  
    console.log('1.query:', query, '2.genreId:', genreId, '3. sortvalue:', sortValue, '4.page:', page);


    let response;
    if(!genreId && !sortValue) {
        response = await axios.get(`${apiUrl}/search/movie?api_key=${apiKey}&query=${encodeURIComponent(query)}${pageString}`);
    } else if (!query) {
       response = await axios.get( `${apiUrl}/discover/movie?api_key=${apiKey}${genreString}${sortString}${pageString}`);
    } else {
        response = await axios.get(`${apiUrl}/discover/movie?api_key=${apiKey}${queryString}${genreString}${sortString}${pageString}`);
    }
    
    return response.data.results;
});


const movieSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {
        resetSearchResults(state) {
            state.searchResults = [];
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchGenres.pending, (state) => {
            state.loading = true;
            state.error = null
        })
        .addCase(fetchGenres.fulfilled, (state, action) => {
            state.loading = false;
            state.genres = action.payload;
        })
        .addCase(fetchGenres.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })
        .addCase(fetchMovies.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchMovies.fulfilled, (state, action) => {
            state.loading = false;
            const newMovies = action.payload.filter(movie => 
                !state.movies.some(existingMovie => existingMovie.id === movie.id)
            );
            state.movies = [...state.movies, ...newMovies];
        })
        .addCase(fetchMovies.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })
        .addCase(fetchSearchResults.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchSearchResults.fulfilled, (state, action) => {
            state.loading = false;
            state.searchResults = [...state.searchResults, ...action.payload];
        })
        .addCase(fetchSearchResults.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })
    }
})

export const { resetSearchResults } = movieSlice.actions;
export default movieSlice.reducer;