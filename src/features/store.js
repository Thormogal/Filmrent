import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./rootreducer";


export default configureStore({
    reducer: rootReducer
})