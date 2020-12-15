import { ADD_SENTENCE, CLEAR_SENTENCES } from "../actions/types";

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
        sentencesByIndex: [...state.sentencesByIndex, action.payload.sentenceIndex],
      };
    case CLEAR_SENTENCES:
      return{
        ...state, 
        sentences: state.sentences.filter(sentence => sentence.content === 1), 
        sentencesByIndex: state.sentencesByIndex.filter(sentenceIndex => sentenceIndex.content === '')

      }
    default:
      return state;
  }
}