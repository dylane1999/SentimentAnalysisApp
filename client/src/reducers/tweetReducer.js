import { ADD_TWEET } from "../actions/types";

const initialState = {
  tweetInfo: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_TWEET:
      return {
        ...state,
        tweetInfo:  action.payload,
      };
    default:
      return state;
  }
}