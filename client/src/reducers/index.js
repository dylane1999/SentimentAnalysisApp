import { combineReducers } from "redux";
import tweetReducer from "./tweetReducer";

export const appReducer = combineReducers({
  tweet: tweetReducer,
});


export default appReducer