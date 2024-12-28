export const types = {
  // code editor
  SUBMIT_CODE: "submit_code",
  SUBMIT_CSHARP_CODE: "submit_csharp_code",
  SUBMIT_TEST: "submit_test",
  RETRIEVE_DETAILS: "retrieve_details",
  RETRIEVE_TESTCASES: "retrieve_testcases",
  RETRIEVE_DETAILS_TESTCASES: "retrieve_details_testcases",

  // program submmition
  CODEEXECUTE_UTIL: "codeexecute_util",
  CODEEXECUTE_C_UTIL: "codeexecute_c_util",
  P_SUBMIT_CODE: "p_submit_code",

  // Problem Set
  PROBLEM_SET: "problem_set",
  HARD_PROBLEM_SET: "hard_problem_set",

  // UTILS
  // -- CODE EDITOR
  SELECTEDLANGUAGE_UTIL: "selected_language_util",
  SAVE_CURRENT_CODE_UTIL: "save_current_code_util",

  // REPORT
  REPORT: "REPORT",
};

// UTILS

export const setSelectedLanguage = (payload) => ({
  type: types.SELECTEDLANGUAGE_UTIL,
  payload,
});

export const saveCurrentCode = (payload) => ({
  type: types.SAVE_CURRENT_CODE_UTIL,
  payload,
});

export const problemSetDispatch = (payload) => ({
  type: types.PROBLEM_SET,
  payload,
});

export const hard_problemSetDispatch = (payload) => ({
  type: types.HARD_PROBLEM_SET,
  payload,
});
