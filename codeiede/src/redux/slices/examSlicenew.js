import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  runCount: 0,
  // Add any other state properties related to the exam if needed
};

const examSlice = createSlice({
  name: "exam",
  initialState,
  reducers: {
    increaseRunCount: (state) => {
      state.runCount += 1; // Increment run count
    },
    resetRunCount: (state) => {
      state.runCount = 0; // Reset run count
    },
    // Add any additional reducers if necessary
  },
});

// Export actions
export const { increaseRunCount, resetRunCount } = examSlice.actions;

// Export reducer
export default examSlice.reducer;
