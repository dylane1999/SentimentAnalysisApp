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
        <EmbeddedTweet details={props} />
        <GraphSection />
      </AnalysisWrapper>
    </Root>
  );
};
//props.setTweetSearched function to set tgrue when searched

function mapStatetoProps(state) {
  return {
    loading: state.loading,
    author: {
      profileName: state.author.profileName,
      name: state.author.name,
      image: state.author.profileImage,
    },
    tweet: {
      contents: state.document.documentContents,
      createdTime: state.tweetMetaData.createdTime,
    },
    document: {
      documentContents: state.document.documentContents,
      documentScore: state.document.documentScore,
      documentMagnitude: state.document.documentMagnitude,
    },
    documentSentences: {
      sentences: state.documentSentences.sentences,
      sentencesByIndex: state.documentSentences.sentencesByIndex,
    },
    analysisType: {
      documentAnalysis: state.analysisType.documentAnalysis
    },
  };
}

export default connect(mapStatetoProps, { getSentimentData })(TweetAnalysis);
