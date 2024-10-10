import { createSlice } from "@reduxjs/toolkit";

const initialState = [{id: 1, title: "movie ", poster_path: "/8cdWjvZQUExUUTzyp4t6EDMubfO.jpg", fullPrice: 32.00, discount: 10.00}, {id: 2, title: "movie 2", poster_path: "/kM7iMPQ3GaWruUkQWZrlckGvWGN.jpg", fullPrice: 32.00, discount: 8.00}];

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            state.push(action.payload);
        },
        removeFromCart: (state, action) => {
            const id = action.payload;
            return state.filter(movie => movie.id !== id);
        }
        
    }
});

export const {addToCart, removeFromCart} = cartSlice.actions;

export default cartSlice.reducer;