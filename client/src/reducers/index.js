import { combineReducers } from "redux";
import documentReducer from "./documentReducer";
import authorReducer from "./authorReducer";
import sentencesReducer from "./sentencesReducer";
import loadingReducer from "./loadingReducer";

export const appReducer = combineReducers({
  document: documentReducer,
  author: authorReducer,
  sentences: sentencesReducer,
  loading: loadingReducer,
});

export default appReducer;
