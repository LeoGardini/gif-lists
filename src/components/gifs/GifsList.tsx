import {
  Container,
  Grid,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  TextField,
} from "@mui/material";
import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import useDebouncer from "../../hooks/useDebouncer";
import {
  fetchGifs,
  getAllGifs,
  getGifsError,
  getGifsStatus,
  searchGifs,
} from "../../redux/features/gifSlice";

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
  }, [debouncedSearch]);

  let gifsOptions;
  if (gifsStatus === "loading") gifsOptions = <p>Loading...</p>;
  else if (gifsStatus === "failed") gifsOptions = <p>{gifsError}</p>;
  else
    gifsOptions = gifs.map((gif) => (
      <ImageListItem key={gif.id}>
        <img src={gif.images?.original.url} alt={gif.title} loading="lazy" />
        <ImageListItemBar title={gif.title} />
      </ImageListItem>
    ));

  return (
    <Container>
      <h1>Gifs List</h1>
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
    </Container>
  );
}

export default GifsList;
