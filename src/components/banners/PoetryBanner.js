import React from "react";
import styled from "styled-components";
// Banner Image
import bg_image from "../../css/images/poetry_bg.jpg";

const Header = styled.div`
  background-image: url(${bg_image});
  border-radius: 5px;
  background-size: cover;
  background-repeat: no-repeat;
`;
/**
 * TODO: Remove the mix-blend-mode whenever there is something else overlaying
 */
const H1 = styled.h1`
  color: white;
  font-weight: 600;
  font-size: 600%;
  text-align: center;
  mix-blend-mode: difference;
  padding: 1%;
  @media only screen and (max-width: 1200px) {
    font-size: 450%;
  }
  @media only screen and (max-width: 900px) {
    font-size: 300%;
  }
  @media only screen and (max-width: 600px) {
    font-size: 200%;
  }
`;
const PoetryBanner = () => {
  return (
    <Header>
      <H1>Poetry</H1>
    </Header>
  );
};
export default PoetryBanner;
