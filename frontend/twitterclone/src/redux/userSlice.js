import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: (() => {
      const stored = localStorage.getItem("user");
      if (!stored || stored === "undefined") return null;
      try {
        return JSON.parse(stored);
      } catch {
        return null;
      }
    })(),
    otherUsers: null,
    profile: null,
  },
  reducers: {
    //multiple actions
    getUser: (state, action) => {
      state.user = action.payload;
    },
    getOtherUsers: (state, action) => {
      state.otherUsers = action.payload;
    },
    getMyProfile: (state, action) => {
      state.profile = action.payload;
    },
    followingUpdate: (state, action) => {
      if (!state.user || !state.user.following) return;

      // unfollow
      if (state.user.following.includes(action.payload)) {
        state.user.following = state.user.following.filter(
          (ItemId) => ItemId !== action.payload
        );
      } else {
        state.user.following.push(action.payload);
      }

      // Persist updated user state to localStorage
      localStorage.setItem("user", JSON.stringify(state.user));
    },
    bookmarkUpdate: (state, action) => {
      if (!state.user) return;

      // Initialize bookmarks array if it doesn't exist
      if (!state.user.bookmarks) {
        state.user.bookmarks = [];
      }

      // Toggle bookmark
      if (state.user.bookmarks.includes(action.payload)) {
        state.user.bookmarks = state.user.bookmarks.filter(
          (tweetId) => tweetId !== action.payload
        );
      } else {
        state.user.bookmarks.push(action.payload);
      }

      // Persist updated user state to localStorage
      localStorage.setItem("user", JSON.stringify(state.user));
    },
    updateUser: (state, action) => {
      if (!state.user) return;

      // Update user data
      state.user = { ...state.user, ...action.payload };

      // Update profile if it's the same user
      if (state.profile && state.profile._id === action.payload._id) {
        state.profile = { ...state.profile, ...action.payload };
      }

      // Persist updated user state to localStorage
      localStorage.setItem("user", JSON.stringify(state.user));
    },
  },
});

export const {
  getUser,
  getOtherUsers,
  getMyProfile,
  followingUpdate,
  bookmarkUpdate,
  updateUser,
} = userSlice.actions;
export default userSlice.reducer;
