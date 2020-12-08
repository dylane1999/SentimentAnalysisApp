import { combineReducers } from "redux";
import tweetReducer from "./reducerOne";

export const appReducer = combineReducers({
  tweet: tweetReducer,
});