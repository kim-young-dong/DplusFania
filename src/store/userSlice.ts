// store/exampleSlice.ts
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};

const exampleSlice = createSlice({
  name: "example",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    unsetUser(state) {
      state.user = null;
    },
  },
});

export const { setUser } = exampleSlice.actions;

export default exampleSlice.reducer;
