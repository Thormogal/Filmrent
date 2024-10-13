import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovieById, selectMovie, selectMovieLoading, selectMovieError } from '../features/detailedMovieSlice';

export const useDetailedMovieData = (movieId) => {
  const dispatch = useDispatch();
  const movie = useSelector(selectMovie);
  const loading = useSelector(selectMovieLoading);
  const error = useSelector(selectMovieError);

  useEffect(() => {
    if (movieId) {
      dispatch(fetchMovieById(movieId));
    }
  }, [dispatch, movieId]);

  return { movie, loading, error };
};

export default useDetailedMovieData;
