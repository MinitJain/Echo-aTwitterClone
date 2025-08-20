import { createSlice } from "@reduxjs/toolkit";

const tweetSlice = createSlice({
  name: "tweet",
  initialState: {
    tweets: [],
    refresh: false,
  },
  reducers: {
    getAllTweets: (state, action) => {
      console.log("Reducer received:", action.payload); // debug log
      state.tweets = action.payload;
    },
    getRefresh: (state) => {
      state.refresh = !state.refresh;
    },
  },
});

export const { getAllTweets, getRefresh } = tweetSlice.actions;
export default tweetSlice.reducer;
