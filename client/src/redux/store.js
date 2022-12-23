import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    question: questionReducer,
  },
});

export default store;
