import { pictureActions } from "../actions/picture";

interface Picture {
  date: string,
  explanation: string,
  title: string,
  url: string,
}

interface initialPictureState {
  isLoading: boolean,
  error: string | null,
  picture: Picture,
}

const initialState: initialPictureState = {
  isLoading: false,
  error: null,
  picture: {} as Picture,
}

const pictureReducer = (state = initialState, action: pictureActions): initialPictureState => {
  switch (action.type) {
    case "FETCH_PICTURE_DATA_SUCCESS":
      return {
        ...state,
        isLoading: false,
        error: null,
        picture: { ...action.payload },
      };
    case "FETCH_PICTURE_DATA_START":
      return {
        ...state,
        error: null,
        isLoading: true,
        picture: {} as Picture,
      };
    case "FETCH_PICTURE_DATA_FAILURE":
      return {
        ...state,
        isLoading: false,
        picture: {} as Picture,
        error:  action.payload,
      };
    default:
      return state;
  }
}

export default pictureReducer;
