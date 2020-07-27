import { put, takeLatest, call } from "redux-saga/effects";
import axios from 'axios';

const fetchPictures = async (url: string) => {
  const data = await axios.get(url);
  return data.data;
}

export const getPicturesAsync = function* ({payload}: any) {
  try {
    yield put({type: "FETCH_PICTURE_DATA_START" });
    const url = `https://api.nasa.gov/planetary/apod?api_key=${process.env.REACT_APP_NASA_API_KEY}&date=${payload.apiDate}`;
    const data = yield call(fetchPictures, url);
    yield put({type: "FETCH_PICTURE_DATA_SUCCESS", payload: data});
  } catch (error) {
    yield put({type: "FETCH_PICTURE_DATA_FAILURE", payload: error});
  }
};

export const getPicturesWatcher = function*() {
  yield takeLatest("GET_ASYNC_DATA", getPicturesAsync);
}
