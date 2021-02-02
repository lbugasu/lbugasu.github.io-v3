import React from "react";
import styled from "styled-components";
// Banner Image
import bg_image from "../../css/images/fiction_bg.jpg";

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
  font-weight: 600;
  font-size: 600%;
  text-align: center;
  padding: 1%;
`;
const FictionBanner = () => {
  return (
    <Header>
      <H1>Fiction</H1>
    </Header>
  );
};
export default FictionBanner;
