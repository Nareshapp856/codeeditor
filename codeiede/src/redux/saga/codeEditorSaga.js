import { takeLatest, put, call, select } from "redux-saga/effects";
import {
  retrieveDetailsRequest,
  retrieveDetailsSuccess,
  retrieveDetailsError,
  retrieveTestCasesRequest,
  retrieveTestCasesSuccess,
  retrieveTestCasesError,
  submitTestRequest,
  submitTestSuccess,
  submitTestError,
} from "../slices/codeEditorSlice";
import { types } from "../actions/types";
import {
  submitUserCodeApi,
  submitUserCCodeApi1,
  retrieveDetailsApi,
  retrieveTestCasesApi,
  submitTestApi,
} from "../../services/api";
import {
  setSavingError,
  setIsSavingLoading,
  setMonacoSliceItem,
  setSelectedLanguage,
  submitCodeError,
  submitCodeRequest,
  submitCodeSuccess,
} from "../slices/examSlice";
import { problemApiSplitService } from "../../services/problemApiSplitService";

function* submitUserCodeSaga(action) {
  try {
    yield put(submitCodeRequest());

    const res = yield call(submitUserCodeApi, action.payload);

    yield put(
      submitCodeSuccess({
        data: {...res.data,responseCode:201},
        status: res.status,
        statusMessage: res.data.message,
      })
    );
  } catch (error) {
    yield put(
      submitCodeError({ status: error.status, statusMessage: error.response.data.error.message })
    );
  }
}

function* submitTestSaga(action) {
  try {
    yield put(submitTestRequest());

    const res = yield call(submitTestApi, action.payload);

    yield put(
      submitTestSuccess({
        data: res.data,
        status: res.status,
        statusMessage: res.data.message,
      })
    );
  } catch (error) {
    yield put(
      submitTestError({ status: error.status, statusMessage: error.message })
    );
  }
}

function* submitUserCsharpCodeSaga(action) {
  try {
    yield put(submitCodeRequest());

    const res = yield call(submitUserCCodeApi1, action.payload);
    
    if(res.ok){
      console.log("success",res);
    }
    else{
      console.log("false:",res.error);
    }

    yield put(
      submitCodeSuccess({
        data: {...res.data,responseCode:201},
        status: res.status,
        statusMessage: res.data.message,
      })
    );
  } catch (error) {
    console.log(error);
    yield put(
      submitCodeError({ status: error.response.status, statusMessage: error.response.data.error.message })
    );
  }
}

function* retrieveDetailsSaga(action) {
  try {
    yield put(retrieveDetailsRequest());

    const res = yield call(retrieveDetailsApi, action.payload);

    yield put(
      retrieveDetailsSuccess({
        data: res.data.dbresult[0],
        status: res.status,
        statusMessage: res.data.message,
      })
    );
  } catch (error) {
    yield put(
      retrieveDetailsError({
        status: error.status,
        statusMessage: error.message,
      })
    );
  }
}

function* retrieveTestCasesSaga(action) {
  try {
    yield put(retrieveTestCasesRequest());

    const res = yield call(retrieveTestCasesApi, action.payload);

    yield put(
      retrieveTestCasesSuccess({
        data: res.data.dbresult,
        status: res.status,
        statusMessage: res.data.message,
      })
    );
  } catch (error) {
    yield put(
      retrieveTestCasesError({
        status: error.status,
        statusMessage: error.message,
      })
    );
  }
}

function* retieveDetailsTestCasesSaga(action) {
  try {
    const programSetData = yield select((state) => state.problemSet);

    const [detailsData, testcasesData] = problemApiSplitService(
      programSetData,
      action.payload
    );

    yield put(retrieveDetailsRequest());
    yield put(retrieveTestCasesRequest());

    yield put(
      retrieveTestCasesSuccess({
        data: testcasesData.data.dbresult,
        status: testcasesData.status,
        statusMessage: [],
      })
    );

    yield put(
      retrieveDetailsSuccess({
        data: detailsData.data.dbresult[0] || {},
        status: detailsData.status,
        statusMessage: detailsData.data.message,
      })
    );
  } catch (error) {
    yield put(
      retrieveTestCasesError({
        status: error.status,
        statusMessage: error.message,
      })
    );
  }
}

// UTILS
export function* selectedLanguageUtilSaga(action) {
  try {
    yield put(setIsSavingLoading(true));
    const { userCode, selectedLanguage } = yield select(
      (state) => state.codeEditor
    );

    yield put(
      setMonacoSliceItem({
        ...action.payload,
        language: selectedLanguage,
        code: userCode,
      })
    );

    yield put(setSelectedLanguage(action.payload.language));
    yield put(setIsSavingLoading(false));
  } catch (err) {
    yield put(setSavingError({ flag: true, errorMsg: err.message }));
  }
}

export function* saveCurrentCodeUtilSaga(action) {
  try {
    yield put(setIsSavingLoading(true));

    yield put(
      setMonacoSliceItem({
        key: action.payload.key,
        code: action.payload.code,
        language: action.payload.language,
      })
    );

    yield put(setIsSavingLoading(false));
  } catch (err) {
    yield put(setSavingError({ flag: true, errorMsg: err.message }));
  }
}

export function* watcherSaga() {
  yield takeLatest(types.SUBMIT_CODE, submitUserCodeSaga);
  yield takeLatest(types.SUBMIT_CSHARP_CODE, submitUserCsharpCodeSaga);
  yield takeLatest(types.RETRIEVE_DETAILS, retrieveDetailsSaga);
  yield takeLatest(types.RETRIEVE_TESTCASES, retrieveTestCasesSaga);
  yield takeLatest(types.SUBMIT_TEST, submitTestSaga);
  yield takeLatest(
    types.RETRIEVE_DETAILS_TESTCASES,
    retieveDetailsTestCasesSaga
  );
  yield takeLatest(types.SELECTEDLANGUAGE_UTIL, selectedLanguageUtilSaga);
  yield takeLatest(types.SAVE_CURRENT_CODE_UTIL, saveCurrentCodeUtilSaga);
}
