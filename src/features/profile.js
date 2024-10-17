import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    name: "Jonas Bondesson", 
    id: 1, 
    boughtList: [], 
    savedList:[],
    }

    const profileSlice = createSlice({
        name: "profile",
        initialState,
        reducers: {
            addToBoughtList: (state, action) => {
                const movieTimeStamp = {
                    bought: new Date(),
                    expirationDays: 1

                }
                let expirationDate = new Date(movieTimeStamp.bought).setDate(movieTimeStamp.bought.getDate() + movieTimeStamp.expirationDays);
                let movie = action.payload;                
                let movieWithTimeStamp = {...movie, expirationDate: expirationDate}
                state.boughtList.push(movieWithTimeStamp);
            },
            removeFromBoughtList: (state, action) => {
                const id = action.payload;
                state.boughtList = state.boughtList.filter(movie => movie.id !== id);
            },
            addToSavedList: (state, action) => {
                const movieToSave = action.payload;
                state.savedList.push(movieToSave);
            },
            removeFromSavedList: (state, action) => {
                const id = action.payload;
                state.savedList = state.savedList.filter(movie => movie.id !== id);
            },
            
        }
    });

    export const { addToBoughtList, removeFromBoughtList, addToSavedList, removeFromSavedList} = profileSlice.actions;

    export default profileSlice.reducer;