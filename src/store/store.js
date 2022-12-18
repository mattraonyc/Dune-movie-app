import { configureStore } from "@reduxjs/toolkit";
import navOpenReducer from "../features/navOpen/navOpenSlice";
import movieFilterReducer from "../features/movieFilter/movieFilterSlice";
import favouritesListReducer from "../features/favourites/favouritesListSlice";

export const store = configureStore({
  reducer: {
    navOpen: navOpenReducer,
    movieFilter: movieFilterReducer,
    favouritesList: favouritesListReducer,
  }
})