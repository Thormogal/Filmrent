import { combineReducers } from "redux";
import cart from "./cart";


const rootReducer = combineReducers({
    cart: cart
})

export {rootReducer};