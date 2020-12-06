import React, { useState } from "react";

import styled from "styled-components";
import Person from "../components/Person";
import MainCard from "../components/MainCard";
import Header from "../components/Header";
import TweetAnalysis from "../components/TweetAnalysis";

const Root = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  background-color: #6b6b6b;
`;

const Spacing = styled.div`
  padding: 30px;
`;

const AnalysisPage = () => {
  const [tweetSearched, setTweetSearched] = useState(false);
  return (
    <Root>
      <Header />
      <Spacing />
      <MainCard setTweetSearched={setTweetSearched}/>
      {tweetSearched ? <TweetAnalysis /> : null}
    </Root>
  );
};

export default AnalysisPage;
