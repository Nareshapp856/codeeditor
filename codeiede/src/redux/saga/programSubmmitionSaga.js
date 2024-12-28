import { call, put, takeLatest } from "redux-saga/effects";

import {
  executeCodeError,
  executeCodeRequest,
  executeCodeSuccess,
} from "../slices/programSubmmition/executeCodeSlice";
import { executeCodeApi, p_submitCode } from "../../services/api";
import { types } from "../actions/types";
import {
  submitCodeError,
  submitCodeRequest,
  submitCodeSuccess,
} from "../slices/programSubmmition/submitCodeSlice";

function* executeCodeSaga(action) {
  try {
    yield put(executeCodeRequest());

    const res = yield call(executeCodeApi, action.payload);

    yield put(
      executeCodeSuccess({
        data: res.data,
        status: res.status,
        statusMessage: res.data.message,
      })
    );
  } catch (error) {
    yield put(
      executeCodeError({ status: error.status, statusMessage: error.message })
    );
  }
}

function* executeCCodeSaga(action) {
  try {
    yield put(executeCodeRequest());

    const res = yield call(executeCodeApi, action.payload);

    yield put(
      executeCodeSuccess({
        data: res.data,
        status: res.status,
        statusMessage: res.data.message,
      })
    );
  } catch (error) {
    yield put(
      executeCodeError({ status: error.status, statusMessage: error.message })
    );
  }
}

function* submitCodeSaga(action) {
  try {
    yield put(submitCodeRequest());

    const res = yield call(p_submitCode, action.payload);

    yield put(
      submitCodeSuccess({
        data: res.data,
        status: res.status,
        statusMessage: res.data.message,
      })
    );
  } catch (error) {
    yield put(
      submitCodeError({
        status: error.response.status,
        statusMessage: error?.response?.body?.message || error.statusText,
      })
    );
  }
}

export function* watcherSaga() {
  yield takeLatest(types.P_SUBMIT_CODE, submitCodeSaga);

  yield takeLatest(types.CODEEXECUTE_UTIL, executeCodeSaga);
  yield takeLatest(types.CODEEXECUTE_C_UTIL, executeCCodeSaga);
}
