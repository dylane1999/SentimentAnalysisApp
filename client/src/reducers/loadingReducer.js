import { SET_LOADING } from "../actions/types";

const initialState = {
  applicationLoading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        applicationLoading: action.payload,

      };
    default:
      return state;
  }
}
