import { combineReducers } from "@reduxjs/toolkit";
import {
  retrieveDetailsSlice,
  retrieveTestCasesSlice,
  submitCsharpCodeSlice,
  submitTestSlice,
} from "./codeEditorSlice";
import {
  codeEditorSlice,
  monacoSlice,
  submitCodeSlice,
  timerSlice,
} from "./examSlice";
import { programSubmmitionSlice } from "./ProgramSubmmitionSlice";
import { executeCodeSlice } from "./programSubmmition/executeCodeSlice";
import { prog_submitCodeSlice } from "./programSubmmition/submitCodeSlice";
import { problemSetSlice } from "./problemSet";
import { reportSlice } from "./report";

export const reducer = combineReducers({
  // CodeEditor
  codeEditor: codeEditorSlice.reducer,
  submitCode: submitCodeSlice.reducer,
  submitTest: submitTestSlice.reducer,
  retrieveDetails: retrieveDetailsSlice.reducer,
  retrieveTestCases: retrieveTestCasesSlice.reducer,
  submitCsharpCode: submitCsharpCodeSlice.reducer,

  // Exam
  timer: timerSlice.reducer,
  monacoReducer: monacoSlice.reducer,

  // Program Submmiton
  programSubmmition: programSubmmitionSlice.reducer,
  executeCode: executeCodeSlice.reducer,

  // Problem Set
  problemSet: problemSetSlice.reducer,

  prog_submitcode: prog_submitCodeSlice.reducer,

  // Report
  report: reportSlice.reducer,
});
