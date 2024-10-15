import { createSlice } from "@reduxjs/toolkit";

const initialState = {cart: [
//   { 
//     id: 1, 
//     movieID: 533535,
//     title: "Deadpool & Wolverine", 
//     poster_path: "/8cdWjvZQUExUUTzyp4t6EDMubfO.jpg", 
//     fullPrice: 32.00, 
//     discount: 0.00,
//     finalPrice: 32.00
//   },
//   { 
//     id: 2, 
//     movieID: 974262,
//     title: "Aurora", 
//     poster_path: "/kM7iMPQ3GaWruUkQWZrlckGvWGN.jpg", 
//     fullPrice: 32.00, 
//     discount: 8.00,
//     finalPrice: 24.00
//   }
], showToast: false,
message: ''};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
        console.log(action.payload);
        const {movieToBuy, message} = action.payload;
      state.cart.push(movieToBuy);
      state.message = message;
      state.showToast = true;
    },
    removeFromCart: (state, action) => {
      const {id, message} = action.payload;
      state.message = message;
      state.showToast = true;
    // const id = action.payload;
        
      state.cart = state.cart.filter(movie => movie.id !== id);
    },
    resetCart: (state) => {
        state.cart = [];
    },
    setShowToast: (state, action) => {
        state.showToast = action.payload;
    },
    setMessage: (state, action) => {
        state.message = action.payload;
    }
  }
});

export const { addToCart, removeFromCart, resetCart, setShowToast, setMessage} = cartSlice.actions;

export default cartSlice.reducer;