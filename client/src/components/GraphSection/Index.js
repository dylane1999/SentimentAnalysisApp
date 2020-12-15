import React, { useState } from "react";
import styled from "styled-components";
import BarChart from "./BarChart";
import IOSSwitch from "./IOSSwitch";
import { connect } from "react-redux";
import { switchAnalysisType } from "../../actions";

const Root = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const AnalysisWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 60vw;
  background-color: #cccccc;
  @media (max-width: 500px) {
    width: 85vw;
  }
`;

const SwitchWrapper = styled.div`
  display: flex;
  width: 50vw;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
`;

const ToggleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ButtonHeading = styled.div`
  font-family: aktiv-grotesk;
  color: white;
  font-size: 12px;
`;

const AnalysisHeading = styled.div`
  font-family: aktiv-grotesk;
  color: white;
  font-size: 24px;
  padding: 25px;
`;

const AnalysisHeadingWrapper = styled.div`
  display: flex;
  width: 100vw;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

// flexbox container for the analysis card
const AnalysisContainer = styled.div`
  display: flex;
  flex-flow: row wrap; // shorthand for flex-direction and flex-wrap
  justify-content: center;
`;

// "Sentiment Analysis header for the card"
const AnalysisHeader = styled.header`
  font-size: 40px;
  font-family: Al Tarikh;
  color: #ffffff;
  background-color: #6b6b6b;
  flex: 1 0 100%;
  text-align: center;
`;

// the actual card, which just defines some padding and the background color
const AnalysisCard = styled.div`
  background-color: #15212b;
  height: auto;
  border-radius: 25px;
  padding-left: 5%;
  padding-right: 5%;
`;

// formatting for user info: right now, this is just the user profile name
const AnalysisUserInfo = styled.div`
  color: white;
  font-size: 20px;
  font-family: aktiv-grotesk;
  padding-top: 5%;
`;

// styling for the text from the tweet
const AnalysisTweetText = styled.div`
  font-size: 16px;
  color: white;
  text-align: left;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 400px;
  padding-top: 5%;
`;

// formatting for meta-data of the tweet. Right now this is just the time the tweet was created
const AnalysisTweetMeta = styled.div`
  font-size: 14px;
  color: #798896;
  padding-top: 5%;
  padding-bottom: 5%;
`;

const Index = (props) => {
  const [documentAnalysis, toggleAnalysis] = useState(
    props.analysisType.documentAnalysis
  );
  let documentData = [];
  let sentenceData = [];
  let sentenceLabels = [];

  const handleDocumentData = () => {
    // if document score is below 0 changes the bounds to (-1, 1)
    if (props.document.documentScore < 0) {
      documentData.push(props.document.documentScore, props.document.documentMagnitude, -1, 1);
    } else {
      documentData.push(props.document.documentScore, props.document.documentMagnitude, 0, 1);
    }
  };

  const renameSentences = (sentence) => {
    if (sentence.length > 20) {
      let slicedSentence = sentence.slice(0, 21);
      let sentenceLabel = slicedSentence.concat("...");
      return sentenceLabel;
    } else {
      return sentence;
    }
  };

  const handleSentenceData = () => {
    props.documentSentences.sentences.forEach((sentence) => {
      // Number.EPSILON represents the difference between 1 and the smallest floating point number greater than 1.
      // https://stackoverflow.com/questions/11832914/round-to-at-most-2-decimal-places-only-if-necessary
      sentenceData.push(
        Math.round((sentence.score + Number.EPSILON) * 100) / 100
      );
      const sentenceLabel = renameSentences(sentence.content);
      sentenceLabels.push(sentenceLabel);
    });
    sentenceData.push(0, 1);
  };

  const handleAnalysisChange = () => {
    toggleAnalysis(!documentAnalysis);
    props.switchAnalysisType(props.analysisType.documentAnalysis);
  };

  return (
    <Root>
      {handleDocumentData()}
      {handleSentenceData()}
      <SwitchWrapper>
        <ToggleWrapper>
          <ButtonHeading>
            switch to{" "}
            {props.analysisType.documentAnalysis ? "sentences" : "document"}{" "}
          </ButtonHeading>
          <IOSSwitch
            checked={documentAnalysis}
            onChange={handleAnalysisChange}
          />
        </ToggleWrapper>
      </SwitchWrapper>
      <AnalysisWrapper>
        {!props.loading.applicationLoading ? (
          props.analysisType.documentAnalysis ? (
            <BarChart
              labels={["sentiment score", "magnitude"]}
              data={documentData}
              title={"Document"}
            />
          ) : (
            <BarChart
              labels={sentenceLabels}
              data={sentenceData}
              title={"Sentence sentiment score"}
            />
          )
        ) : null}
      </AnalysisWrapper>
    </Root>
  );
};

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
      documentAnalysis: state.analysisType.documentAnalysis,
    },
  };
}

export default connect(mapStatetoProps, { switchAnalysisType })(Index);
