import { createSlice } from "@reduxjs/toolkit";
import { createPostSlice } from "../util/createSliceUtil";

const initialMonacoState = {
  code: {},
  // save
  isSavingSuccess: false,
  isSavingError: false,
  isSavingLoading: false,
  codeSavingError: null,
  runCount: 0,
  autoSave: true,
};

export const timerSlice = createSlice({
  name: "timer",
  initialState: {
    timer: 0,
    shouldCount: true,
  },
  reducers: {
    setTimer(state, action) {
      state.timer = action.payload;
    },
    setShouldCount(state, action) {
      state.shouldCount = action.payload;
    },
    resetTimer(state) {
      state.timer = 0;
    },
    resetRunCount(state) {
      state.runCount = 0;
    },
  },
});

export const submitCodeSlice = createPostSlice({ name: "submitCode" });

export const codeEditorSlice = createSlice({
  name: "codeEditor",
  initialState: {
    userCode: ``,
    selectedLanguage: "",
  },
  reducers: {
    updateUserCode(state, action) {
      state.userCode = action.payload;
    },
    setSelectedLanguage(state, action) {
      state.selectedLanguage = action.payload;
    },
  },
});

export const monacoSlice = createSlice({
  name: "monacoSlice",
  initialState: initialMonacoState,
  reducers: {
    increaseRunCount(state) {
      state.runCount = state.runCount + 1;
    },
    setItem(state, action) {
      const key = action.payload.key;
      const language = action.payload.language;
      const code = action.payload.code;
      if (
        typeof language !== "string" ||
        typeof code !== "string" ||
        typeof key !== "string"
      ) {
        state.isSavingError = true;
        state.codeSavingError = {
          code: "001",
          title: "Error Saving Code",
          message: "must pass valid arguments to save code.",
        };

        throw new Error(
          "Must pass valid data to reducer monacoSlice/setItem" + !language &&
            "(language is not passed)" + typeof code !== "string" &&
            "code is not passed" + !key &&
            "key is not passed"
        );
      }

      if (!(key.length && language.length && code.length)) return;

      if (!state.code[key]) state.code[key] = {};
      state.code[key][language] = code;
    },
    setIsSavingLoading(state, action) {
      state.isSavingLoading = action.payload;
    },
    setSavingError(state, action) {
      state.isSavingError = action.payload.isError;
      state.codeSavingError = action.payload.errorMsg;
    },
    setAutoSave(state, action) {
      state.autoSave = action.payload;
    },
    resetItem(state, action) {
      if (state.code && state.code[action.payload])
        state.code[action.payload] = {};
    },
    resetMonacoState(state, _) {
      state = initialMonacoState;
    },
  },
});

export const {
  fetchDataRequest: submitCodeRequest,
  fetchDataSuccess: submitCodeSuccess,
  fetchDataError: submitCodeError,
  resetState: submitCodeReset,
} = submitCodeSlice.actions;

export const { updateUserCode, setSelectedLanguage } = codeEditorSlice.actions;

export const {
  setItem: setMonacoSliceItem,
  resetItem: resetMonacoSliceCodeItem,
  resetMonacoState,
  setIsSavingLoading,
  setSavingError,
  setAutoSave,
  increaseRunCount,
} = monacoSlice.actions;

export const { setTimer, resetTimer, setShouldCount, resetRunCount } =
  timerSlice.actions;
