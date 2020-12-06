import React from 'react';
import styled from "styled-components";
import BrandBackground from "../imgs/BrandBackground.png"


const Root = styled.div`
  background-color: #515151;
  height: 550px;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

//fix backgrond position on smaller screens
const Card = styled.div`
  background-color: #3D3838;
  height: 400px;
  width: 60vw;
  background-image: url(${BrandBackground});
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: 70% 20%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-radius: 25px;
`;
const MainCard = () => {
  return (
    <Root>
      <Card/>
    </Root>
  )
}

export default MainCard
