import React, { useState, useEffect } from "react";
import styled from "styled-components";
import LoadingGif from "../css/images/LoadingGif.gif";

const Frame = styled.div`
  text-align: center;
`;

const Loading = ({ size }) => {
  return (
    <Frame>
      <img
        style={{ width: `${100 * size}%` }}
        src={LoadingGif}
        alt={"loading gif"}
      ></img>
    </Frame>
  );
};
export default Loading;
