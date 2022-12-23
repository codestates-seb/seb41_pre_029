//리듀서를 만들어주는 메서드

import { createSlice } from "@reduxjs/toolkit";

const questionSlice = createSlice({
  name: "question",
  initialState,
  reducers: {
    getAllQuestions(state, action) {
      state.questionList = action.payload.data;
    },
  },
});

export default questionSlice.reducer;

export const questionAction = questionSlice.actions;
