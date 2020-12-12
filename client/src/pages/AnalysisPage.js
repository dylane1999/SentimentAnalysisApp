import React, { useState } from "react";

import styled from "styled-components";
import Person from "../components/Person";
import MainCard from "../components/MainCard";
import Header from "../components/Header";
import TweetAnalysis from "../components/TweetAnalysis";
import { connect } from "react-redux";
import Backdrop from "@material-ui/core/Backdrop";
import CircularLoader from "../components/CircularLoader";
import { makeStyles } from "@material-ui/core/styles";

const Root = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 100vh;
  width: 100vw;
  background-color: #6b6b6b;
`;

const Spacing = styled.div`
  padding: 30px;
`;

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: 50,
    color: "#fff",
  },
}));

const AnalysisPage = (props) => {
  const [tweetSearched, setTweetSearched] = useState(false);
  const classes = useStyles();
  const [documentAnalysis, toggleAnalysis] = useState(true);
  const [open, setOpen] = useState(true);

  const handleAnalysisChange = (params) => {
    toggleAnalysis(!documentAnalysis);
  };

  return (
    <Root>
      <Backdrop
        className={classes.backdrop}
        open={props.loading.applicationLoading}
      >
        <CircularLoader />
      </Backdrop>
      <Header />
      <MainCard setTweetSearched={setTweetSearched} />
      {props.document.documentScore != null ? <TweetAnalysis /> : null}
    </Root>
  );
};

function mapStatetoProps(state) {
  return {
    document: state.document,
    sentences: state.sentences,
    analysisType: state.analysisType,
    loading: state.loading
  };
}

export default connect(mapStatetoProps)(AnalysisPage);
