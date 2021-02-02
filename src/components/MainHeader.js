import React from "react";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import styled from "styled-components";
import $ from "jquery";

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
  const Up = styled.span`
    font-size: 80%;
  `;
  const Floating = styled.div`
    position: -webkit-sticky;
    position: sticky;
    top: 0;
    right: 0;
    position: fixed;
    float: right;
    padding-right: 8.25%;
    display: none;
  `;
  const FloatingMenu = styled.div`
    display: inline-block;
    font-family: "Whirly Bats";
    text-align: right;
    font-size: 150%;
    @media only screen and (max-width: 900px) {
      font-size: 90%;
    }
    @media only screen and (max-width: 600px) {
      font-size: 80%;
    }
  `;
  return (
    <>
      <Header id={"up"}>
        <Title>
          <Link to="/">LAURENCE ININDA</Link>
        </Title>
        <Menu>
          <span
            onClick={() => {
              let menu = document.querySelector("div.mainmenu");
              $(menu).css("display", "block");
            }}
            className="specialChar showHover"
          >
            I
          </span>
        </Menu>
      </Header>
      <Floating id={"floating-menu"}>
        <FloatingMenu>
          <Up>
            <HashLink smooth to={`#up`}>
              △{" "}
            </HashLink>
          </Up>
          <span
            onClick={() => {
              let menu = document.querySelector("div.mainmenu");
              $(menu).css("display", "block");
            }}
            className="specialChar showHover"
          >
            I
          </span>
        </FloatingMenu>
      </Floating>
    </>
  );
};
export default MainHeader;
