import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    name: "Jonas Bondesson", 
    id: 1, 
    boughtList: [{}], 
    savedList:[{}]}

    const profileSlice = createSlice({
        name: "profile",
        initialState,
        reducers: {
            addToBoughtList: (state, action) => {
                state.boughtList.push(action.payload);
            },
            removeFromBoughtList: (state, action) => {
                const id = action.payload;
                return state.boughtList.filter(movie => movie.movieID !== id);
            },
            addToSavedList: (state, action) => {
                state.savedList.push(action.payload);
            },
            removeFromSavedList: (state, action) => {
                const id = action.payload;
                return state.savedList.filter(movie => movie.movieID !== id);
            }
        }
    });

    export const {addToBoughtList, removeFromBoughtList, addToSavedList, removeFromSavedList} = profileSlice.actions;

    export default profileSlice.reducer;