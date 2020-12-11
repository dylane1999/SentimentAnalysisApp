import { ADD_SENTENCE } from "../actions/types";

const initialState = {
  sentences: [],
  sentencesByIndex: []
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_SENTENCE:
      return {
        ...state,
        sentences: [...state.sentences, action.payload.sentenceData],
        sentencesByIndex: [...state.sentencesByIndex, action.payload.sentenceIndex]
      };
    default:
      return state;
  }
}