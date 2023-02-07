import { configureStore } from "@reduxjs/toolkit";

import gifSlice from "./features/gifSlice";

export default configureStore({ reducer: { gifs: gifSlice } });
