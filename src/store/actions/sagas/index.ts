import { all, fork } from 'redux-saga/effects';
import { getPicturesWatcher } from './picture';

export default function* rootSaga () {
  yield all([
    fork(getPicturesWatcher),
  ]);
}
