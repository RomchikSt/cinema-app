import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { TMDB_TOKEN } from "../../shared/const";

export const fetchTopRatedTvSeries = createAsyncThunk(
  "topRatedTvSeries/fetchTopRatedTvSeries",
  async () => {
    const response = await axios.get(
      "https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1",
      {
        headers: {
          accept: "application/json",
          Authorization: TMDB_TOKEN,
        },
      }
    );

    return response.data.results;
  }
);

const topRatedFilmsSlice = createSlice({
  name: "topRatedTvSeries",
  initialState: {
    topRatedTvSeries: [],
    statusTopRatedTvSeries: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTopRatedTvSeries.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchTopRatedTvSeries.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.topRatedTvSeries = action.payload;
      })
      .addCase(fetchTopRatedTvSeries.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default topRatedFilmsSlice.reducer;
