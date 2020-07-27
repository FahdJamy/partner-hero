import {createStore, applyMiddleware, combineReducers} from "redux";
import createSagaMiddleware from 'redux-saga';
import pictureReducer from "./reducers/picture";
import rootSaga from "./actions/sagas";

// Middleware: Redux Saga
const rootReducer = combineReducers({
  picture: pictureReducer,
})
const sagaMiddleware = createSagaMiddleware();

export const store = createStore(
  rootReducer,
  applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(rootSaga)

export default store;
export type ROOT_STATE = ReturnType<typeof rootReducer>;
