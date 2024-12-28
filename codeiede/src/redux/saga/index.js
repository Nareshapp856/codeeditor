import { all } from "redux-saga/effects";
import { watcherSaga as problemSetWatcher } from "./problemSet";
import { watcherSaga as codeEditorWatcher } from "./codeEditorSaga";
import { watcherSaga as programSubmmitoinWatcher } from "./programSubmmitionSaga";
import { watcherSaga as reportWatcher } from "./report";

export function* adminSaga() {
  yield all([
    codeEditorWatcher(),
    programSubmmitoinWatcher(),
    problemSetWatcher(),
    reportWatcher(),
  ]);
}
