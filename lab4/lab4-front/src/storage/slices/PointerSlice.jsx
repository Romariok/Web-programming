import { createSlice } from '@reduxjs/toolkit';

export const PointerSlice = createSlice({
  name: 'pointer',
  initialState: {
    pointerVisibility: "hidden",
  },
  reducers: {
    showPointer: state => {
      state.pointerVisibility = "visible";
    },
    hidePointer: state => {
      state.pointerVisibility = "hidden";
    },
  },
});

export const { showPointer, hidePointer } = PointerSlice.actions;

export const pointerSelector = state => state.pointer;