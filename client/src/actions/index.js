import axios from "axios";
import { ADD_DOCUMENT, ADD_AUTHOR, ADD_SENTENCE, SET_LOADING } from "./types";

export const getSentimentData = (tweetUid) => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING, payload: true });
    let sentanceCounter = 0;
    const res = await axios.post(`/analyze/${tweetUid}`); //post request to analyze sentiment backen
    dispatch({ type: ADD_AUTHOR, payload: res.data.twitter.user });

    dispatch({ type: ADD_DOCUMENT, payload: res.data });

    res.data.google.sentences.map((sentence) => {
      const sentencePayload = {
        sentenceData: {
          score: sentence.sentiment.score,
          magnitude: sentence.sentiment.magnitude,
          content: sentence.text.content,
        },
        sentenceIndex: sentanceCounter,
      };
      dispatch({ type: ADD_SENTENCE, payload: sentencePayload });
      sentanceCounter++;
    });
    dispatch({ type: SET_LOADING, payload: false });
  } catch (err) {
    console.log(err);
    dispatch({ type: SET_LOADING, payload: false });
    window.alert("tweet Link incorect, improperly formatted, or from a private account")
  }
};
