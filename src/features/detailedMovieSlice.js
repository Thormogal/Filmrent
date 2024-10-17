import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  movie: null,
  credits: null,
  trailer: null,
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
      state.movie = action.payload.movie;
      state.credits = action.payload.credits;
      state.trailer = action.payload.trailer;
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
    
    const movieResponse = await axios.get(`${apiURL}/movie/${movieId}`, {
      headers: {
        Authorization: `Bearer ${apiToken}`,
      },
    });
    
    const creditsResponse = await axios.get(`${apiURL}/movie/${movieId}/credits`, {
      headers: {
        Authorization: `Bearer ${apiToken}`,
      },
    });

    const videosResponse = await axios.get(`${apiURL}/movie/${movieId}/videos`, {
      headers: {
        Authorization: `Bearer ${apiToken}`,
      },
    });

    const trailer = videosResponse.data.results.find(video => video.type === 'Trailer' && video.site === 'YouTube');
    console.log(trailer);
    dispatch(fetchMovieSuccess({ 
      movie: movieResponse.data, 
      credits: creditsResponse.data,
      trailer: trailer ? trailer.key : null,
    }));

  } catch (error) {
    dispatch(fetchMovieFailure(error.response ? error.response.data : error.message));
  }
};

export const selectMovie = (state) => state.movie.movie;
export const selectMovieCredits = (state) => state.movie.credits;
export const selectMovieTrailer = (state) => state.movie.trailer;
export const selectMovieLoading = (state) => state.movie.loading;
export const selectMovieError = (state) => state.movie.error;

export default detailedMovieSlice.reducer;
