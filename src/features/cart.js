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
], 
// showToast: false,
// toastMessage: '', 
totalFullPrice: 0,
coupon: null,
totalSavings: 0,
totalDiscount: 0,
totalCouponsDiscount: 0,
couponDiscount: 0,
totalPrice: 0,
savingsMessage: '',
coupons: [
    { code: "10%OFF", percentage: 0.1 },
    { code: "20%OFF", percentage: 0.2 },
    { code: "30%OFF", percentage: 0.3 }
],

};

const calculateCart = (state) => {
  const totalFullPrice = state.cart.reduce((total, item) => total + item.fullPrice, 0) || 0;
  const totalDiscount = state.cart.reduce((total, item) => total + (item.fullPrice - item.finalPrice), 0) || 0;

  // Se till att subtotal alltid är positiv och att rabatter inte överstiger fullpriset
  const subtotal = Math.max(totalFullPrice - totalDiscount, 0);

  // Kupongrabatt beräknad på subtotal
  const totalCouponsDiscount = state.coupon ? (subtotal * state.couponDiscount) : 0;

  // Total efter kupongavdrag, se till att det inte går under noll
  const totalPrice = Math.max(subtotal - totalCouponsDiscount, 0).toFixed(2);

  // Sammanlagda besparingar
  const totalSavings = (parseFloat(totalDiscount) + parseFloat(totalCouponsDiscount)).toFixed(2);

  // Uppdatera state med beräknade värden
  state.totalFullPrice = totalFullPrice.toFixed(2);
  state.totalDiscount = totalDiscount.toFixed(2);
  state.totalCouponsDiscount = totalCouponsDiscount.toFixed(2);
  state.totalPrice = totalPrice;
  state.totalSavings = totalSavings;

  const discountExists = state.totalDiscount > 0;
  const couponExists = state.totalCouponsDiscount > 0;

  if (discountExists && couponExists) {
      state.savingsMessage = "with discount and coupons";
  } else if (discountExists) {
      state.savingsMessage = "with discount";
  } else if (couponExists) {
      state.savingsMessage = "with coupons";
  } else {
      state.savingsMessage = "";
  }
};





const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
        
        const movieToBuy = action.payload;
      state.cart.push(movieToBuy);
    //   state.toastMessage = message;
    //   state.showToast = true;
      calculateCart(state);
    },
    removeFromCart: (state, action) => {
      const id = action.payload;
  
      state.cart = state.cart.filter(movie => movie.id !== id);
  
      calculateCart(state);
  },
    resetCart: (state) => {
        state.cart = [];
        
    },
    // setShowToast: (state, action) => {
    //     state.showToast = action.payload;
    // },
    // setMessage: (state, action) => {
    //     state.toastMessage = action.payload;
    // }, 
    setCoupon: (state, action) => {
        state.coupon = action.payload;
        state.couponDiscount = action.payload.percentage;
        // state.toastMessage = `Coupon ${state.coupon.code} was added`;
        // state.showToast = true;
        calculateCart(state);
    },
    remmoveCoupon: (state) => {
        state.coupon = null;
        state.couponDiscount = 0;
        // state.toastMessage = `Coupon was removed`;
        // state.showToast = true;
        calculateCart(state);
    }
   
    
  },
  
});


export const { 
    addToCart, 
    removeFromCart, 
    resetCart, 
    // setShowToast, 
    // setMessage,
    setCoupon,
    remmoveCoupon,
       
} = cartSlice.actions;

export default cartSlice.reducer;