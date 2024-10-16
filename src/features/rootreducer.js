import { combineReducers } from "redux";
import cart from "./cart";
import profile from "./profile";
import detailedMovie from "./detailedMovieSlice";
import movieList from "./movieListSlice";
import toastSlice from "./toastSlice";

const rootReducer = combineReducers({
    cart: cart,
    profile: profile,
    movies: movieList,
    movie: detailedMovie,
    toast: toastSlice
})

export {rootReducer};