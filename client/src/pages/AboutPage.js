import React from 'react';
import styled from "styled-components";
import Header from "../components/Header";

const Root = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  background-color: #6b6b6b;
`;



const AboutPage = () => {
  return (
    <Root>
      <Header/>
    </Root>
  )
}

export default AboutPage
