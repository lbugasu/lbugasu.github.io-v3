import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const SecondaryHeader = () => {
  const Menu = styled.div`
    font-family: "Crafter";
    font-size: 85%;
    text-align: center;
    padding: 0.5% 0 0.5% 0;
    margin: 0 20% 0 20%;
    width: 60%;
    border-bottom: 1px solid var(--border);
    @media only screen and (max-width: 900px) {
      font-size: 90%;
      width: 70%;
      margin: 2% 15% 1% 15%;
    }
    @media only screen and (max-width: 600px) {
      font-size: 80%;
      width: 95%;
      margin: 2% 2.5% 2% 2.5%;
    }
  `;
  return (
    <Menu className="showHover">
      <Link to="/section/poetry">POETRY</Link> •{" "}
      <Link to="/section/fiction">FICTION</Link> •{" "}
      <Link to="/section/dev">DEV</Link> • <Link to="/snacks">SNACKS</Link>•{" "}
      <Link to="/vault">VAULT</Link>
    </Menu>
  );
};
export default SecondaryHeader;
