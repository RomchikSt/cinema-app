import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { TMDB_TOKEN } from "../../shared/const";

export const fetchTopRatedFilms = createAsyncThunk(
  "topRatedFilms/fetchTopRatedFilms",
  async () => {
    const response = await axios.get(
      "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
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
  name: "topRatedFilms",
  initialState: {
    topRatedMovies: [],
    statusTopRatedMovies: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTopRatedFilms.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchTopRatedFilms.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.topRatedMovies = action.payload;
      })
      .addCase(fetchTopRatedFilms.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default topRatedFilmsSlice.reducer;
