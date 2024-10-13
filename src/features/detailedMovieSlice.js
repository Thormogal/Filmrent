import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  movie: null,
  loading: false,
  error: null,
};

const detailedMovieSlice = createSlice({
  name: 'detailedMovie',
  initialState,
  reducers: {
    fetchMovieStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchMovieSuccess: (state, action) => {
      state.loading = false;
      state.movie = action.payload;
    },
    fetchMovieFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchMovieStart, fetchMovieSuccess, fetchMovieFailure } = detailedMovieSlice.actions;

export const fetchMovieById = (movieId) => async (dispatch) => {
  const apiURL = import.meta.env.VITE_API_URL;
  const apiToken = import.meta.env.VITE_API_READTOKEN;

  try {
    dispatch(fetchMovieStart());
    const response = await axios.get(`${apiURL}/movie/${movieId}`, {
      headers: {
        Authorization: `Bearer ${apiToken}`,
      },
    });
    dispatch(fetchMovieSuccess(response.data));
  } catch (error) {
    dispatch(fetchMovieFailure(error.response ? error.response.data : error.message));
  }
};

export const selectMovie = (state) => state.movie.movie;
export const selectMovieLoading = (state) => state.movie.loading;
export const selectMovieError = (state) => state.movie.error;

export default detailedMovieSlice.reducer;