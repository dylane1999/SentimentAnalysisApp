import axios from "axios";
import ADD_TWEET from "./types";

export const getSentimentData = () => async (dispatch) => {
  const res = await axios.get("/auth/users");
  dispatch({ type: ADD_TWEET, payload: res.data });
};


