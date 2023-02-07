import { TextField } from "@mui/material";
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
    gifsOptions = (
      <ul>
        {gifs.map((gif) => (
          <li key={gif.id}>
            <p>{gif.title}</p>
            <img src={gif.images?.original.url} />
          </li>
        ))}
      </ul>
    );

  return (
    <div>
      <p>Gifs List</p>
      <TextField
        variant="outlined"
        onChange={(e) => setSearch(e.target.value)}
      />
      {gifsOptions}
    </div>
  );
}

export default GifsList;
