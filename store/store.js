import { configureStore } from "@reduxjs/toolkit";
import weekTrendingReducer from "./features/weekTranding";

export const store = configureStore({
  reducer: {
    weekTrending: weekTrendingReducer,
  },
});
