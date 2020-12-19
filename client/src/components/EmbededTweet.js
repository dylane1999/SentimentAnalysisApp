import React from "react";
import styled from "styled-components";

// flexbox container for the analysis card
const AnalysisContainer = styled.div`
  display: flex;
  flex-flow: row wrap; // shorthand for flex-direction and flex-wrap
  justify-content: center;
  align-items: center; 
  padding-bottom: 15px;
`;

// "Sentiment Analysis header for the card"
const AnalysisHeader = styled.header`
  font-size: 40px;
  font-family: Al Tarikh;
  color: #ffffff;
  background-color: #6b6b6b;
  flex: 1 0 100%;
  text-align: center;
  padding-bottom: 15px;
`;

// the actual card, which just defines some padding and the background color
const AnalysisCard = styled.div`
  background-color: #15212b;
  height: auto;
  border-radius: 25px;
  padding-left: 5%;
  padding-right: 5%;

  @media(max-width: 500px){
    width: 345px; 
  }
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

  @media (max-width: 500px) {
    width: 310px; 
  }
`;

// formatting for meta-data of the tweet. Right now this is just the time the tweet was created
const AnalysisTweetMeta = styled.div`
  font-size: 14px;
  color: #798896;
  padding-top: 5%;
  padding-bottom: 5%;
`;

const EmbeddedTweet = (props) => {
  return (
    <AnalysisContainer>
      <AnalysisHeader>Sentiment Analysis</AnalysisHeader>
      <AnalysisCard>
        <AnalysisUserInfo>
          {/* !  IMAGE IS COMMENTED OUT BELOW */}
          {/* <img height="65" width ="65" src={result.twitter.user.url} alt="Twitter Profile" style={{borderRadius:15}}></img> */}
          @{props.details.author.profileName}
        </AnalysisUserInfo>
        <AnalysisTweetText>{props.details.tweet.contents}</AnalysisTweetText>
        <AnalysisTweetMeta>
          {props.details.tweet.createdTime}
        </AnalysisTweetMeta>
      </AnalysisCard>
    </AnalysisContainer>
  );
};

export default EmbeddedTweet;
