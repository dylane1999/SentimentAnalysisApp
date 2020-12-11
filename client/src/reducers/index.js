import { combineReducers } from "redux";
import documentReducer from "./documentReducer";
import authorReducer from "./authorReducer";
import sentencesReducer from "./sentencesReducer";

export const appReducer = combineReducers({
  document: documentReducer,
  author: authorReducer,
  sentences: sentencesReducer,
});

export default appReducer;
