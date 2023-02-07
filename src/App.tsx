import { Route, Routes } from "react-router-dom";
import GifsList from "./components/gifs/GifsList";

import Layout from "./components/Layout";

function App() {
  return (
    <Routes>
      <Route path="" element={<Layout />}>
        <Route index element={<GifsList />} />
      </Route>
    </Routes>
  );
}

export default App;
