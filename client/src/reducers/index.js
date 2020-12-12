import { combineReducers } from "redux";
import documentReducer from "./documentReducer";
import authorReducer from "./authorReducer";
import sentencesReducer from "./sentencesReducer";
import loadingReducer from "./loadingReducer";
import analysisTypeReducer from "./analysisTypeReducer"

export const appReducer = combineReducers({
  document: documentReducer,
  author: authorReducer,
  documentSentences: sentencesReducer,
  loading: loadingReducer,
  analysisType: analysisTypeReducer,
});

export default appReducer;
