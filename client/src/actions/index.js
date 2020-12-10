import axios from "axios";
import ADD_TWEET from "./types";

export const getSentimentData = (tweetID) => async (dispatch) => {
  //parse tweet id from link
  const res = await axios.post(`/analyze/${tweetID}`); //post request to analyze sentiment backend
  dispatch({ type: ADD_TWEET, payload: res.data });
};


