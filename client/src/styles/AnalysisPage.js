import React from "react";

import styled from "styled-components";
import Person from "../components/Person";
import MainCard from "../components/MainCard";

const Root = styled.div`
  background-color: #6b6b6b;
  height: 100vh;
  width: 100vw;
`;

const AnalysisPage = () => {
  return (
    <Root>
      <MainCard />
    </Root>
  );
};

export default AnalysisPage;
