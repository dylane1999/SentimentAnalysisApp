import React, { useState } from "react";
import styled from "styled-components";
import BarChart from "./BarChart";
import IOSSwitch from "./IOSSwitch";
import FormControlLabel from "@material-ui/core/FormControlLabel";

const Root = styled.div`
  display: flex;
  flex-direction: column;
  height: 800px;
  align-items: center;
  justify-content: center;
  width: 100vw;
  background-color: #6b6b6b;
`;
const AnalysisWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 60vw;
  background-color: #cccccc;
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
const TweetAnalysis = () => {
  const [documentAnalysis, toggleAnalysis] = useState(true);

  const handleAnalysisChange = (params) => {
    toggleAnalysis(!documentAnalysis);
  };
  return (
    <Root>
      <AnalysisHeadingWrapper><AnalysisHeading> Document </AnalysisHeading> </AnalysisHeadingWrapper>
      <SwitchWrapper>
        <ToggleWrapper>
          <ButtonHeading>switch to sentance</ButtonHeading>
          <IOSSwitch
            checked={documentAnalysis}
            onChange={handleAnalysisChange}
          />
        </ToggleWrapper>
      </SwitchWrapper>
      <AnalysisWrapper>
        <BarChart
          labels={["magnitude", "sentiment score"]}
          data={[0.5, 0.7, 0, 1]}
          title={"Document"}
        />
        {/* {here conditionally render document vs sentances analysis} */}
      </AnalysisWrapper>
    </Root>
  );
};
//props.setTweetSearched function to set tgrue when searched
export default TweetAnalysis;

// BarChart.propTypes = {
//   labels: PropTypes.array.isRequired,
//   data: PropTypes.array.isRequired,
//   title: PropTypes.string.isRequired,
// };
