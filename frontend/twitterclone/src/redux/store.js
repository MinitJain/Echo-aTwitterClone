import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";

const store = configureStore({
  reducer: {
    // actions
    user: userSlice,
  },
  devTools: true,
});
export default store;
