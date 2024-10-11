import { combineReducers } from "redux";
import cart from "./cart";
import profile from "./profile";


const rootReducer = combineReducers({
    cart: cart,
    profile: profile
})

export {rootReducer};