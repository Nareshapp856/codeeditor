import { createPostSlice } from "../util/createSliceUtil";

export const problemSetSlice = createPostSlice({ name: "problemSet" });

export const {
  fetchDataRequest: fetchProblemsSetStart,
  fetchDataSuccess: fetchProblemsSetSuccess,
  fetchDataError: fetchProblemsSetError,
  resetState: resetProblemSetState,
} = problemSetSlice.actions;
