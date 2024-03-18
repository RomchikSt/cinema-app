import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { TMDB_TOKEN } from "../../shared/const";

export const fetchTrendingMovies = createAsyncThunk(
  "weekTrending/fetchTrendingMovies",
  async () => {
    const response = await axios.get(
      "https://api.themoviedb.org/3/trending/all/week?language=en-US",
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

const weekTrendingSlice = createSlice({
  name: "weekTrending",
  initialState: {
    movies: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTrendingMovies.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchTrendingMovies.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.movies = action.payload.slice(0, 10);
      })
      .addCase(fetchTrendingMovies.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default weekTrendingSlice.reducer;
