import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  forms: [],
};

const global = createSlice({
  name: "forms",
  initialState,
  reducers: {
    addData: (state, action) => {
      state.forms.push(action.payload);
    },
    editData: (state, action) => {
      state.forms.push(action.payload);
    },
    removes: (state, action) => {
      state.forms.splice(action.payload, 1);
    },
  },
});

export const { addData, editData, removes } = global.actions;
export default global.reducer;
