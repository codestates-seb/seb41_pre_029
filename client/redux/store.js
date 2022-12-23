import { configureStore } from "@reduxjs/toolkit";

//리듀서 불러오기

const store = configureStore({
  reducer: {
    question: questionReducer,
  },
});

export default store;
