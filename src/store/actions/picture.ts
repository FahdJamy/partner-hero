interface GET_PICTURE {
  type: 'GET_ASYNC_DATA',
  payload: any
}

interface GET_PICTURE_SUCCESS {
  type: 'FETCH_PICTURE_DATA_SUCCESS',
  payload: any
}

interface GET_PICTURE_START {
  type: 'FETCH_PICTURE_DATA_START',
}

interface GET_PICTURE_FAILURE {
  type: 'FETCH_PICTURE_DATA_FAILURE',
  payload: any
}

export const getPicture = (payload: any): GET_PICTURE => {
  return {
    type: "GET_ASYNC_DATA",
    payload: payload,
  }
};

export const getPictureStart = (): GET_PICTURE_START => {
  return {
    type: "FETCH_PICTURE_DATA_START",
  }
};

export const getPictureSuccess = (payload: any): GET_PICTURE_SUCCESS => {
  return {
    type: "FETCH_PICTURE_DATA_SUCCESS",
    payload: payload,
  }
};

export const getPictureFailure = (payload: any): GET_PICTURE_FAILURE => {
  return {
    type: "FETCH_PICTURE_DATA_FAILURE",
    payload: payload,
  }
};

export type pictureActions = GET_PICTURE | GET_PICTURE_SUCCESS | GET_PICTURE_FAILURE | GET_PICTURE_START;
