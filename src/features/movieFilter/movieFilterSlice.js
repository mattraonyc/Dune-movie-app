import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  valid_values: [
    {
      text: "Popular",
      value: "popular"
    },
    {
      text: "Top Rated",
      value: "top_rated"
    },
    {
      text: "Upcoming",
      value: "upcoming"
    },
    {
      text: "Now Playing",
      value: "now_playing"
    },
  ],
  value: "popular",
  text: "Popular"
}

export const movieFilterSlice = createSlice({
  name: "movieFilter",
  initialState,
  reducers: {
    setMovieFilter: (state, action) => {
      let [ match ] = state.valid_values.filter( (filter) => filter.value === action.payload);
      if ( match ) {
        state.value = match.value;
        state.text = match.text;
      }
    },
    
  }
})

export const {setMovieFilter} = movieFilterSlice.actions;

const movieFilterReducer = movieFilterSlice.reducer;
export default movieFilterReducer;