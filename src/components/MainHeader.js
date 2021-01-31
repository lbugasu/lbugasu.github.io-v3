import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const MainHeader = () => {
  const Header = styled.div`
    border-bottom: 1px solid #47261b;
  `;
  const Title = styled.div`
    width: 50%;
    display: inline-block;
    font-weight: 600;
    font-family: "Etoile";
    font-size: 150%;
    margin: 0;
    @media only screen and (max-width: 900px) {
      font-size: 90%;
      width: 65%;
    }
    @media only screen and (max-width: 600px) {
      font-size: 80%;
      width: 75%;
    }
  `;
  const Menu = styled.div`
    width: 49%;
    display: inline-block;
    font-family: "Whirly Bats";
    text-align: right;
    font-size: 150%;
    @media only screen and (max-width: 900px) {
      font-size: 90%;
      width: 35%;
    }
    @media only screen and (max-width: 600px) {
      font-size: 80%;
      width: 25%;
    }
  `;
  return (
    <Header>
      <Title>
        <Link to="/">LAURENCE ININDA</Link>
      </Title>
      <Menu>
        <span className="specialChar ">I</span>
      </Menu>
    </Header>
  );
};
export default MainHeader;
