import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    showToast: false,
    message: ''
}

const toastSlice = createSlice({
    name: "toast",
    initialState,
    reducers: {
        showToast: (state, action) => {
            const {showToast, message} = action.payload;
            state.message = message;
            state.showToast = showToast;
        }
    }
});

export const {showToast} = toastSlice.actions;

export default toastSlice.reducer;