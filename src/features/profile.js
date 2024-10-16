import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    name: "Jonas Bondesson", 
    id: 1, 
    boughtList: [], 
    savedList:[]}

    const profileSlice = createSlice({
        name: "profile",
        initialState,
        reducers: {
            addToBoughtList: (state, action) => {
                state.boughtList.push(action.payload);
            },
            removeFromBoughtList: (state, action) => {
                const id = action.payload;
                state.boughtList = state.boughtList.filter(movie => movie.id !== id);
            },
            addToSavedList: (state, action) => {
                state.savedList.push(action.payload);
            },
            removeFromSavedList: (state, action) => {
                const id = action.payload;
                state.savedList = state.savedList.filter(movie => movie.id !== id);
            }
        }
    });

    export const {addToBoughtList, removeFromBoughtList, addToSavedList, removeFromSavedList} = profileSlice.actions;

    export default profileSlice.reducer;