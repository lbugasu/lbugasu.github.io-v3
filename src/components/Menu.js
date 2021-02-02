import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import $ from "jquery";
import styled from "styled-components";

import "../css/Menu.css";

const MenuPage = styled.div`
  display: none;
  position: fixed;
  left: 0;
  top: 0;
  background-color: #fff2eb;
  padding: 0 5% 0 5%;
  z-index: 11; /* 1px higher than the overlay layer */
`;
const Title = styled.div`
  padding: 1% 0 0 2.75%;
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
const MenuButton = styled.div`
  width: 49%;
  display: inline-block;
  text-align: right;
  font-size: 150%;
  font-style: italic;
  padding: 0% 2.5% 0 0;

  @media only screen and (max-width: 900px) {
    font-size: 90%;
    width: 35%;
  }
  @media only screen and (max-width: 600px) {
    font-size: 80%;
  }
`;
const Menu = () => {
  /**
   * Event listener to close the menu when any link on that page is clicked
   */
  useEffect(() => {
    let menuPage = $(".mainmenu")[0];

    $(menuPage).on("click", function () {
      let menu = document.querySelector("div.mainmenu");
      $(menu).css("display", "none");
    });
  }, []);

  return (
    <MenuPage className="mainmenu">
      <div style={{ verticalAlign: "bottom" }}>
        <Title>LAURENCE ININDA</Title>
        <MenuButton
          class="frame__button"
          onClick={() => {
            let menu = document.querySelector("div.mainmenu");

            $(menu).css("display", "none");
          }}
        >
          <p className="showHover">Close</p>
        </MenuButton>
      </div>

      <div class="frame">
        <div class="frame__links">
          <a
            href="https://www.instagram.com/laudebugs/"
            target="_blank"
            rel="noreferrer"
            class="frame__link"
          >
            Instagram
          </a>
          <a
            href="https://twitter.com/lbugasu"
            target="_blank"
            rel="noreferrer"
            class="frame__link"
          >
            Twitter
          </a>
          <a
            href="https://www.linkedin.com/in/laurence-ininda/?_l=en_US"
            target="_blank"
            rel="noreferrer"
            class="frame__link"
          >
            LinkedIn
          </a>
          {"|"} &nbsp;<Link to="/section/poetry"> Poetry</Link>
          <Link to="/section/fiction">Fiction</Link>
          <Link to="/section/dev">Dev</Link>
          <Link to="/vault">Vault</Link>
        </div>
      </div>
      <div class="menu">
        <div class="menu__item">
          <a class="menu__item-inner">The Year is 2021</a>
        </div>
        <div class="menu__item">
          <a class="menu__item-inner">Articles</a>
        </div>
        <div class="menu__item">
          <a class="menu__item-inner">Blog progress Updates</a>
        </div>
        <div class="menu__item">
          <a class="menu__item-inner">Letters</a>
        </div>
        <div class="menu__item">
          <a class="menu__item-inner">About Me</a>
        </div>
        <div class="menu__item">
          <a class="menu__item-inner">Work</a>
        </div>
        <div class="menu__item">
          <a class="menu__item-inner">Suggestion & Feedback</a>
        </div>
        <div class="menu__item">
          <a class="menu__item-inner">Get In Touch</a>
        </div>
        <div class="menu__item">
          <a class="menu__item-inner">Playlists & More</a>
        </div>

        <div class="menu__item">
          <a class="menu__item-inner">Gallery</a>
        </div>
        <div class="menu__item">
          <a class="menu__item-inner">Credits</a>
        </div>
      </div>
    </MenuPage>
  );
};
export default Menu;
