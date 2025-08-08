import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    // actions
    user: userSlice,
  },
});
export default store;
