import { combineReducers } from "redux";
import cart from "./cart";
import profile from "./profile";
import detailedMovie from "./detailedMovieSlice";
import movieList from "./movieListSlice";

const rootReducer = combineReducers({
    cart: cart,
    profile: profile,
    movies: movieList,
    movie: detailedMovie
})

export {rootReducer};