import React, { useState, useEffect } from "react";

import styled from "styled-components";
import Person from "../components/Person";
import MainCard from "../components/MainCard";
import Header from "../components/Header";
import TweetAnalysis from "../components/TweetAnalysis";


const Root = styled.div`
  display: flex;
  flex-direction: column;
  */height: 125vh;/*
  height: 100%;
  width: 100vw;
  background-color: #6b6b6b;
`;

const Spacing = styled.div`
  padding: 30px;
`;


const AnalysisPage = () => {
  // passed around to both component
  const [tweetSearched, setTweetSearched] = useState(false);
   const [tweetUrl, setTweetUrl] = useState(false);
  return (
    <Root>
      <Header />
      <MainCard setTweetSearched={setTweetSearched}/>
      {tweetSearched ? null : <TweetAnalysis tweetUrl={tweetUrl} />}
    </Root>
  );
};

export default AnalysisPage;
