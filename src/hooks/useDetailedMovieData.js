import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovieById, selectMovie, selectMovieCredits, selectMovieLoading, selectMovieError, selectMovieTrailer } from '../features/detailedMovieSlice';

export const useDetailedMovieData = (movieId) => {
  const dispatch = useDispatch();
  const movie = useSelector(selectMovie);
  const credits = useSelector(selectMovieCredits);
  const trailer = useSelector(selectMovieTrailer);
  const loading = useSelector(selectMovieLoading);
  const error = useSelector(selectMovieError);

  useEffect(() => {
    if (movieId) {
      dispatch(fetchMovieById(movieId));
    }
  }, [dispatch, movieId]);

  return { movie, credits, trailer, loading, error };
};

export default useDetailedMovieData;
