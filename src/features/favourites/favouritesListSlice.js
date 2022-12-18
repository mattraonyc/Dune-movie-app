import { createSlice } from "@reduxjs/toolkit";
import { localListName, getFavouritesList } from "../../global/globals";

const initialState = {
  value: getFavouritesList(),
}

export const favouritesListSlice = createSlice({
  name: "favouritesList",
  initialState,
  reducers: {
    // Take a movie object and add it to the favourites list
    addFavourite: (state, action) => {
      state.value = [...state.value, action.payload];
      localStorage.setItem(localListName, JSON.stringify(state.value))
    },
    // Take a movie object and filter it out of the favourites list
    removeFavourite: (state, action) => {
      state.value = state.value.filter((favouritedMovie) => favouritedMovie.id !== action.payload.id)
      localStorage.setItem(localListName, JSON.stringify(state.value))
    },
    
  }
})

export const { addFavourite, removeFavourite, isFavourited } = favouritesListSlice.actions;

const favouritesListReducer = favouritesListSlice.reducer;
export default favouritesListReducer;