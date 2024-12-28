import { createPostSlice } from "../../util/createSliceUtil";

export const prog_submitCodeSlice = createPostSlice({
  name: "prog_submitcode",
});

export const {
  fetchDataRequest: submitCodeRequest,
  fetchDataSuccess: submitCodeSuccess,
  fetchDataError: submitCodeError,
  resetState: programSubmmitionReset,
} = prog_submitCodeSlice.actions;
