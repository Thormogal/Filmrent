import { createSlice } from "@reduxjs/toolkit";

const initialState = [{id: 1, 
    movieID: 533535,
    title: "Deadpool & Wolverine", 
    poster_path: "/8cdWjvZQUExUUTzyp4t6EDMubfO.jpg", 
    fullPrice: 32.00, 
    discount: 0.00},
    {id: 2, 
        movieID: 203144,
        title: "Aurora", 
        poster_path: "/kM7iMPQ3GaWruUkQWZrlckGvWGN.jpg", 
        fullPrice: 32.00, 
        discount: 8.00}
];

const reset = [];

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
        },
        resetCart: (state) => {
            return state = [];
        },
        setDummyData: (state) => {
            
            state.push({id: 1, 
                movieID: 533535,
                title: "Deadpool & Wolverine", 
                poster_path: "/8cdWjvZQUExUUTzyp4t6EDMubfO.jpg", 
                fullPrice: 32.00, 
                discount: 0.00});
            state.push(  
            {id: 2, 
                movieID: 203144,
                title: "Aurora", 
                poster_path: "/kM7iMPQ3GaWruUkQWZrlckGvWGN.jpg", 
                fullPrice: 32.00, 
                discount: 8.00});
        }
        
    }
});

export const {addToCart, removeFromCart, resetCart, setDummyData} = cartSlice.actions;

export default cartSlice.reducer;