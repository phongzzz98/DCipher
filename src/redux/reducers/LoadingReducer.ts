import { createSlice, createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";

export const loadingSlice = createSlice({
  name: "loading",
  initialState: false,
  reducers: {
    toggleLoading: (state) => !state
  },
});

const selectSelf = (state: RootState) => state.loadingSlice;
export const loadingSelector = createSelector(selectSelf, (state)=>state)

export const { toggleLoading } = loadingSlice.actions;

export default loadingSlice.reducer;
