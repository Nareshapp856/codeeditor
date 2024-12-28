import { createPostSlice } from "../util/createSliceUtil";

export const retrieveDetailsSlice = createPostSlice({
  name: "retrieveDetails",
});
export const retrieveTestCasesSlice = createPostSlice({
  name: "retrieveTestCases",
});
export const submitCsharpCodeSlice = createPostSlice({
  name: "submitCsharpCode",
});
export const submitTestSlice = createPostSlice({ name: "submitTest" });

// actions

export const {
  fetchDataRequest: retrieveDetailsRequest,
  fetchDataSuccess: retrieveDetailsSuccess,
  fetchDataError: retrieveDetailsError,
  resetState: retrieveDetailsReset,
} = retrieveDetailsSlice.actions;

export const {
  fetchDataRequest: retrieveTestCasesRequest,
  fetchDataSuccess: retrieveTestCasesSuccess,
  fetchDataError: retrieveTestCasesError,
  resetState: retrieveTestCasesReset,
} = retrieveTestCasesSlice.actions;

export const {
  fetchDataRequest: submitCsharpCodeRequest,
  fetchDataSuccess: submitCsharpCodeSuccess,
  fetchDataError: submitCsharpCodeError,
  resetState: submitCsharpCodeReset,
} = submitCsharpCodeSlice.actions;

export const {
  fetchDataRequest: submitTestRequest,
  fetchDataSuccess: submitTestSuccess,
  fetchDataError: submitTestError,
  resetState: submitTestReset,
} = submitTestSlice.actions;
