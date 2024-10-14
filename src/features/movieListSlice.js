import axios from "axios"
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"


const apiUrl = import.meta.env.VITE_API_URL;
const apiKey = import.meta.env.VITE_API_KEY;

const initialState = {
    genres: [],
    movies: [],
    loading: false,
    error: null,
}

export const fetchGenres = createAsyncThunk('movies/fetchGenres', async () => {
    const response = await axios.get(`${apiUrl}/genre/movie/list?api_key=${apiKey}`)
    return response.data.genres;
})

export const fetchMovies = createAsyncThunk('movies/fetchMovies', async () => {
    const response = await axios.get(`${apiUrl}/discover/movie?api_key=${apiKey}`)
    console.log("movies", response.data.results);
    return response.data.results;
})

const movieSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {},
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
            state.movies = action.payload;
        })
        .addCase(fetchMovies.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
    }
})


export default movieSlice.reducer;