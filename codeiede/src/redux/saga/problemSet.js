import { call, put, select, takeLatest, delay } from "redux-saga/effects";
import { types } from "../actions/types";
import {
  fetchProblemsSetError,
  fetchProblemsSetStart,
  fetchProblemsSetSuccess,
} from "../slices/problemSet";
import { dev_reportApi, retriveExamData } from "../../services/api";
import storage from "redux-persist/lib/storage";
import { persistKey } from "..";

const MAX_RETRIES = 5;
const INITIAL_DELAY = 1000;

async function rehydrateState() {
  const persistedState = await storage.getItem(`persist:${persistKey}`);
  return JSON.parse(persistedState);
}

async function removeSliceFromPersistedState(sliceKey) {
  const state = await rehydrateState();
  if (state) {
    const stateObj = state;
    delete stateObj[sliceKey];
    return JSON.stringify(stateObj);
  }
  return null;
}

async function updatePersistedState(sliceKey) {
  const newState = await removeSliceFromPersistedState(sliceKey);
  if (newState !== null) {
    await storage.setItem(`persist:${persistKey}`, newState);
  }
}

function* problemSetSaga(action) {
  yield call(updatePersistedState, "problemSet");

  const problemsData = yield select((state) => state.problemSet);
  const problemSet = yield select((state) => state.problemSet);
  const monacoReducer = yield select((state) => state.monacoReducer);

  yield put(fetchProblemsSetStart({}));

  const currentTestId = action.payload?.testId || 0;
  const storedTestId = localStorage.getItem("testId");

  const userData = localStorage.getItem("auth");
  const userObj = { data: userData ? JSON.parse(userData) : {}, role: "dev" };

  if (problemsData.state === "reslove" && problemsData.data === null) {
    yield call(dev_reportApi, {
      reason: "ANOMALIE",
      description: "CodeIDE Problemset Empty",
      data: { problemSet, monacoReducer },
      user: userObj,
    });
  }

  console.log(
    currentTestId !== storedTestId,
    storedTestId,
    currentTestId,
    action.payload
  );

  if (
    problemsData.state === "stale" ||
    problemsData.data === null ||
    (currentTestId && storedTestId !== currentTestId)
  ) {
    let retries = 0;
    let success = false;
    let res;
    while (retries < MAX_RETRIES && !success) {
      try {
        localStorage.setItem("testId", currentTestId);
        res = yield call(retriveExamData, action.payload);
        localStorage.setItem("req", JSON.stringify(action.payload));
        localStorage.setItem("res", JSON.stringify(res.data));
        success = true;
      } catch (error) {
        retries += 1;
        const delayTime = INITIAL_DELAY * 2 ** retries;
        yield delay(delayTime);
      }
    }

    if (success) {
      yield put(fetchProblemsSetSuccess({ ...res }));
    } else {
      yield put(
        fetchProblemsSetError({
          message: "Failed to retrieve data after multiple attempts",
        })
      );
    }
  } else {
    yield put(fetchProblemsSetSuccess({ ...problemsData }));
  }
}

function* hard_problemSetSaga(action) {
  yield call(updatePersistedState, "problemSet");

  const problemsData = yield select((state) => state.problemSet);
  const problemSet = yield select((state) => state.problemSet);
  const monacoReducer = yield select((state) => state.monacoReducer);

  yield put(fetchProblemsSetStart({}));

  const userData = localStorage.getItem("auth");
  const userObj = { data: userData ? JSON.parse(userData) : {}, role: "dev" };

  if (problemsData.state === "reslove" && problemsData.data === null) {
    yield call(dev_reportApi, {
      reason: "ANOMALIE",
      description: "CodeIDE Problemset Hard Refresh",
      data: { problemSet, monacoReducer },
      user: userObj,
    });
  }

  let retries = 0;
  let success = false;
  let res;
  while (retries < MAX_RETRIES && !success) {
    try {
      res = yield call(retriveExamData, action.payload);

      success = true;
    } catch (error) {
      retries += 1;
      const delayTime = INITIAL_DELAY * 2 ** retries;
      yield delay(delayTime);
    }
  }

  if (success) {
    yield put(fetchProblemsSetSuccess({ ...res }));
  } else {
    yield put(
      fetchProblemsSetError({
        message: "Failed to retrieve data after multiple attempts",
      })
    );
  }
}

export default problemSetSaga;

export function* watcherSaga() {
  yield takeLatest(types.PROBLEM_SET, problemSetSaga);
  yield takeLatest(types.HARD_PROBLEM_SET, hard_problemSetSaga);
}
