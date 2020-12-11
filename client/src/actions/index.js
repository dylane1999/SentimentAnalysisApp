import axios from "axios";
import { ADD_DOCUMENT, ADD_AUTHOR, ADD_SENTENCE } from "./types";

export const getSentimentData = (tweetUid) => async (dispatch) => {
  let sentanceCounter = 0
  //parse tweet id from link
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
      sentenceIndex: sentanceCounter
    };
    dispatch({ type: ADD_SENTENCE, payload: sentencePayload });
    sentanceCounter++
  });
};
