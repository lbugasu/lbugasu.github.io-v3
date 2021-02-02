import React from "react";
import styled from "styled-components";
// Banner Image
import bg_image from "../../css/images/fiction_bg.jpg";

const Header = styled.div`
  background-image: url(${bg_image});
  border-radius: 5px;
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
      <H1>Poetry</H1>
    </Header>
  );
};
export default FictionBanner;
