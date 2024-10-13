import { combineReducers } from "redux";
import cart from "./cart";
import profile from "./profile";
import detailedMovie from "./detailedMovieSlice";


const rootReducer = combineReducers({
    cart: cart,
    profile: profile,
    movie: detailedMovie
})

export {rootReducer};