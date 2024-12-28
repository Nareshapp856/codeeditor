import { createPostSlice } from "../util/createSliceUtil";

export const reportSlice = createPostSlice({ name: "report" });

export const {
  fetchDataRequest: reportStart,
  fetchDataSuccess: reportSuccess,
  fetchDataError: reportError,
  resetState: resetReportState,
} = reportSlice.actions;
