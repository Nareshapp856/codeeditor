import { reportApi } from "../../services/api";
import { types } from "../actions/types";
import { reportError, reportStart, reportSuccess } from "../slices/report";
import { put, call, takeLatest } from "redux-saga/effects";

function* reportSaga(action) {
  try {
    yield put(reportStart());

    const res = yield call(reportApi, action.payload);

    yield put(
      reportSuccess({
        data: res.data,
        status: res.status,
        statusMessage: res.data.message,
      })
    );
  } catch (error) {
    yield put(
      reportError({ status: error.status, statusMessage: error.message })
    );
  }
}

export function* watcherSaga() {
  yield takeLatest(types.REPORT, reportSaga);
}
