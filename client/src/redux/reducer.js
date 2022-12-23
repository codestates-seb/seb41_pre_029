//리듀서를 만들어주는 메서드
import { createSlice } from "@reduxjs/toolkit";

import axios from "axios";

const API_URL = "http://localhost:8080/questions";

const questionSlice = createSlice({
  name: "question",
  initialState: {
    data: [],
  },
  reducers: {
    getAllQuestions: (state, action) => {
      state.data = [action.payload];
    },
  },
});

export const getAllQuestionsAsync = () => async (dispatch) => {
  try {
    const response = await axios.get(`${API_URL}`);
    dispatch(getAllQuestions(response.data));
  } catch (err) {
    throw new Error(err);
  }
};

export default questionSlice.reducer;
export const showQuestion = (state) => state.question.data;
export const { getAllQuestions } = questionSlice.actions;
