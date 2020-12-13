import { combineReducers } from "redux";
import documentReducer from "./documentReducer";
import authorReducer from "./authorReducer";
import sentencesReducer from "./sentencesReducer";
import loadingReducer from "./loadingReducer";
import analysisTypeReducer from "./analysisTypeReducer"
import createdTimeReducer from "./createdTimeReducer"

export const appReducer = combineReducers({
  document: documentReducer,
  author: authorReducer,
  documentSentences: sentencesReducer,
  loading: loadingReducer,
  analysisType: analysisTypeReducer,
  tweetMetaData: createdTimeReducer
});

export default appReducer;
