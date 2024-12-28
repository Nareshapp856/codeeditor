import { createSlice } from "@reduxjs/toolkit";

const initialFormDataState = {
  problemName: "",
  problemDescription: "",
  sampleInput: "",
  image: "",
  sampleOutput: "",
  explanation: "",
};

const initialState = {
  files: [
    {
      fileName: "main",
      extension: ".c",
      language: "c",
      code: "#include<stdio.h>",
    },
    {
      fileName: "index",
      extension: ".js",
      language: "javascript",
      code: "console.log('hi')",
    },
  ],
  selectedFile: 0,
  selectedTheme: null,
  testCases: {
    0: {
      name: `Task `,
      id: 0,
      input: "",
      outpt: "",
    },
  },
  formData: initialFormDataState,
  availableFiles: 0,
};

export const programSubmmitionSlice = createSlice({
  name: "programSubmmition",
  initialState: initialState,
  reducers: {
    setFile(state, action) {
      const fileName = action.payload.fileName;
      const extension = action.payload.extension;
      const language = action.payload.language;
      const code = action.payload.code;

      if (!fileName) throw new Error("must pass name to add new templete");
      if (!extension)
        throw new Error("must pass extension to add new templete");
      if (!language) throw new Error("must pass language to add new templete");
      if (!code) throw new Error("must pass code to add new templete");

      if (!state.files) state.files = [];

      state.files[state.availableFiles] = {
        id: fileName + extension,
        fileName,
        extension,
        language,
        code,
      };
    },
    setCode(state, action) {
      if (!state.files?.[state.selectedFile])
        throw new Error("something went wrong trying to update code.");

      state.files[state.selectedFile].code = action.payload;
    },
    setSelectedFile(state, action) {
      state.selectedFile = action.payload;
    },
    setFormItem(state, action) {
      state.formData[action.payload.key] = action.payload.value;
    },
    resetFormDate(state, _) {
      state.formData = initialFormDataState;
    },
    setTestCaseItem(state, action) {
      if (!action.payload?.value)
        throw new Error(
          "must pass valid values to set testcase.",
          action.payload?.key,
          action.payload?.value
        );

      if (!state.testCases) state.testCases = {};
      state.testCases[action.payload.key] = action.payload.value;
    },
    setTestCaseItemData(state, action) {
      if (!(action.payload?.value || action.payload.property))
        throw new Error(
          "must pass valid values to set testcase.",
          action.payload?.key,
          action.payload?.value
        );

      state.testCases[action.payload.key][action.payload.property] =
        action.payload.value;
    },
    removeTestCaseItem(state, action) {
      delete state.testCases[action.payload];
    },
    resetTestCase(state, _) {
      state.testCases = null;
    },
    setTestCases(state, action) {
      state.testCases = action.payload;
    },
    resetProgramSubmmitionSlice(state, _) {
      state.files = initialState.files;
      state.selectedFile = initialState.selectedFile;
      state.selectedTheme = initialState.selectedTheme;
      state.testCases = initialState.testCases;
      state.formData = initialState.formData;
      state.availableFiles = initialState.availableFiles;
    },
  },
});

export const {
  setFile,
  setSelectedFile,
  setFormItem,
  resetFormDate,
  resetProgramSubmmitionSlice,
  setTestCaseItem,
  resetTestCase,
  setTestCases,
  setTestCaseItemData,
  removeTestCaseItem,
  setCode: setUserCode,
} = programSubmmitionSlice.actions;
