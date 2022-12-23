// //리듀서를 만들어주는 메서드
// import { createSlice } from "@reduxjs/toolkit";

// import { useEffect } from "react";

// import axios from "axios";
// import { createAsyncThunk } from "@reduxjs/toolkit";

// export const questionAction = createAsyncThunk(
//   "questionSlice/questionAction",
//   async (payload) => {
//     const response = await axios("/quesions", {
//       method: "get",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       data: payload,
//     });

//     return response;
//   }
// );

// const questionSlice = createSlice({
//   name: "questions",
//   initialState: [],
//   reducers: {
//     getOneQuestion: (state, action) => {
//       state.data.push(action.payload);
//     },
//   },
//   extraReducers: (builder) => {
//     builder.addCase(questionAction.pending, (state) => {
//       state.loading = "pending";
//     });
//     builder.addCase(questionAction.fulfilled, (state, action) => {
//       state.loading = "succeeded";
//       state.user = action.payload;
//     });
//     builder.addCase(questionAction.rejected, (state) => {
//       state.loading = "failed";
//     });
//   },
// });

// export default questionSlice.reducer;
// // export const showQuestion = (state) => state;
// export const { getOneQuestion } = questionSlice.actions;
