import { configureStore } from "@reduxjs/toolkit";
import weekTrendingReducer from "./features/weekTrending";
import topRatedFilmsReducer from "./features/topRatedFilms";
import topRatedTvSeriesReducer from "./features/topRatedTvSeries";

export const store = configureStore({
  reducer: {
    weekTrending: weekTrendingReducer,
    topRatedFilms: topRatedFilmsReducer,
    topRatedTvSeries: topRatedTvSeriesReducer,
  },
});
