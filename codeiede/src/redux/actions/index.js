import { types } from "./types";

export const submitCode = (payload) => ({
  type: types.SUBMIT_CODE,
  payload,
});

export const submitCsharpCode = (payload) => ({
  type: types.SUBMIT_CSHARP_CODE,
  payload,
});

export const submitTest = (payload) => ({
  type: types.SUBMIT_TEST,
  payload,
});

export const p_submitCode = (payload) => ({
  type: types.P_SUBMIT_CODE,
  payload,
});

export const executeCode = (payload) => {
  // Parameters userInput.replaceAll("\n", " ").split(" "),
  // ProgramId "NA",

  if (
    !(
      payload.Code ||
      payload.Language ||
      payload.ProgramName ||
      payload.UserName ||
      typeof Parameters !== "string"
    )
  )
    throw new Error("Must pass valid data to execute code");

  if (payload.Language === "c") {
    return {
      type: types.CODEEXECUTE_C_UTIL,
      payload: {
        ...payload,
        Parameters: payload.Parameters.replaceAll("\n", " ").split(" "),
        ProgramId: "NA",
      },
    };
  }

  return {
    type: types.CODEEXECUTE_UTIL,
    payload: {
      ...payload,
      Parameters: payload.Parameters.replaceAll("\n", " ").split(" "),
      ProgramId: "NA",
    },
  };
};

export const reportDispatch = (payload) => ({
  type: types.REPORT,
  payload,
});
