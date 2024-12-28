import { createPostSlice } from "../../util/createSliceUtil";

export const executeCodeSlice = createPostSlice({ name: "executeCode" });

export const {
  fetchDataRequest: executeCodeRequest,
  fetchDataSuccess: executeCodeSuccess,
  fetchDataError: executeCodeError,
  resetState: resetExecuteCodeSlice,
} = executeCodeSlice.actions;
