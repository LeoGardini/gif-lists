import { Grid, ImageList, ImageListItem, TextField } from "@mui/material";
import { useEffect, useState, useDeferredValue, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import useDebouncer from "../../hooks/useDebouncer";
import {
  fetchGifs,
  getAllGifs,
  getGifsError,
  getGifsStatus,
  searchGifs,
} from "../../redux/features/gifSlice";
import CardItem from "../CardItem";

function GifsList() {
  const dispatch = useDispatch();

  const [search, setSearch] = useState("");

  const gifs = useSelector(getAllGifs);
  const gifsStatus = useSelector(getGifsStatus);
  const gifsError = useSelector(getGifsError);

  const debouncedSearch = useDebouncer(search);
  const handleSearchGifs = useCallback(
    () => dispatch(searchGifs(debouncedSearch) as any),
    [debouncedSearch]
  );

  useEffect(() => {
    if (!gifs.length) dispatch(fetchGifs() as any);
  }, [gifs, dispatch]);

  useEffect(() => {
    if (debouncedSearch) handleSearchGifs();
  }, [debouncedSearch, dispatch]);

  let gifsOptions;
  if (gifsStatus === "loading") gifsOptions = <p>Loading...</p>;
  else if (gifsStatus === "failed") gifsOptions = <p>{gifsError}</p>;
  else
    gifsOptions = gifs.map((gif) => (
      <Grid item xs={12} sm={6}>
        <ImageListItem key={gif.id}>
          <Grid container>
            <Grid item xs={12}>
              <h2>{gif.title}</h2>
            </Grid>
            <Grid item xs={12}>
              <img src={gif.images?.original.url} alt={gif.title} />
            </Grid>
          </Grid>
        </ImageListItem>
      </Grid>
    ));

  return (
    <div>
      <p>Gifs List</p>
      <Grid container>
        <Grid item xs={12}>
          <TextField
            fullWidth
            variant="outlined"
            onChange={(e) => setSearch(e.target.value)}
          />
        </Grid>
      </Grid>
      <ImageList cols={3} rowHeight="auto" variant="quilted">
        {gifsOptions}
      </ImageList>
    </div>
  );
}

export default GifsList;
