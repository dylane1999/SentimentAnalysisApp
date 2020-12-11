import { ADD_DOCUMENT } from "../actions/types";

const initialState = {
  documentContents: null,
  documentScore: null, 
  documentMagnitude: null
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_DOCUMENT:
      return {
        ...state,
        documentContents:  action.payload.twitter.tweet.text,
        documentScore: action.payload.google.documentSentiment.score,
        documentMagnitude: action.payload.google.documentSentiment.magnitude
      };
    default:
      return state;
  }
}