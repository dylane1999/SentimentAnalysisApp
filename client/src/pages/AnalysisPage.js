import React from "react";

import styled from "styled-components";
import Person from "../components/Person";

const Root = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: whitesmoke;
  height: 100vh;
  width: 100vw;
`;

const AnalysisPage = () => {
  return (
    <Root>
      <Person />
    </Root>
  );
};

export default AnalysisPage;
