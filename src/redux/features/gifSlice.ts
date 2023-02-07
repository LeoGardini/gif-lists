import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../infra/http/api";

export type GifsState = {
  status: "idle" | "loading" | "succeed" | "failed";
  gifs: {
    type: "gif";
    id: string;
    url: string;
    slug: string;
    title: string;
    images: {
      original: {
        url: string;
        hash: string;
      };
    };
  }[];
  error?: string | null;
};

export const fetchGifs = createAsyncThunk("gifs/fetchGifs", async () => {
  try {
    const { data } = await api.get("/trending", { params: { limit: 10 } });
    return data.data;
  } catch (e: any) {
    return e.message;
  }
});

export const searchGifs = createAsyncThunk(
  "gifs/searchGifs",
  async (search: string) => {
    try {
      const { data } = await api.get("/search", { params: { q: search } });
      return data.data;
    } catch (e: any) {
      return e.message;
    }
  }
);

const initialState: GifsState = {
  status: "idle",
  gifs: [],
  error: null,
};

const gifSlice = createSlice({
  name: "gifs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGifs.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchGifs.fulfilled, (state, action) => {
        state.status = "succeed";
        state.gifs = action.payload;
      })
      .addCase(fetchGifs.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(searchGifs.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(searchGifs.fulfilled, (state, action) => {
        state.status = "succeed";
        state.gifs = action.payload;
      })
      .addCase(searchGifs.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const getAllGifs = (state: { gifs: GifsState }) => state.gifs.gifs;
export const getGifsError = (state: { gifs: GifsState }) => state.gifs.error;
export const getGifsStatus = (state: { gifs: GifsState }) => state.gifs.status;

export default gifSlice.reducer;
