import React, { useState, useEffect } from "react";
import styled from "styled-components";
import BarChart from "./GraphSection/BarChart";
import IOSSwitch from "./GraphSection/IOSSwitch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { connect, useSelector } from "react-redux";
import { getSentimentData } from "../actions";
import GraphSection from "./GraphSection/Index";
import EmbeddedTweet from "./EmbededTweet";


const Root = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  align-items: center;
  justify-content: center;
  width: 100vw;
  background-color: #6b6b6b;
`;
const AnalysisWrapper = styled.div`
  display: flex;
  padding-top: 35px;
  padding-bottom: 35px;
  flex-direction: column;
  justify-content: center;
`;

const TweetAnalysis = () => {
  const [documentAnalysis, toggleAnalysis] = useState(true);

  const handleAnalysisChange = (params) => {
    toggleAnalysis(!documentAnalysis);
  };
  
  const tweetId = props.tweetUrl ? props.tweetUrl.split("/")[props.tweetUrl.split("/").length - 1] : false;
  const result = useAsyncHook(tweetId);
  
  function useAsyncHook(tweetId) {
  /**
   * asynchronous call to the backend API.
   * 
   * @param tweetId: ID of the tweet to retrieve data for.
   * 
   * @returns the response from the backend API.
   */
  const [tweetData, setTweetData] = useState(""); // initial state set to "", but once the call to the backend is complete the state is changed to response.data

  useEffect(() => {
    async function fetchTweetData(tweetId) {
      const response = await getBackendData(tweetId);
      setTweetData(response.data);
    }

    console.log(tweetId);

    if (tweetId) {
      fetchTweetData(tweetId);
    } else {
      console.log("escaped!");
    }
  }, [tweetId]);
  return tweetData;
}

  
  
  return (
    <Root>
      <AnalysisWrapper>
        <EmbeddedTweet />
        <GraphSection />
      </AnalysisWrapper>
    </Root>
  );
};
//props.setTweetSearched function to set tgrue when searched

function mapStatetoProps(state) {
  return {
    tweet: state.tweet,
  };
}

export default connect(mapStatetoProps, { getSentimentData })(TweetAnalysis);
