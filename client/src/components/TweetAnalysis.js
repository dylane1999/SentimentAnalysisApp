import React, { useState } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
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

const TweetAnalysis = (props) => {
  const [documentAnalysis, toggleAnalysis] = useState(true);

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
    loading: state.loading,
  };
}

export default connect(mapStatetoProps, { getSentimentData })(TweetAnalysis);
