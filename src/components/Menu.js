import React from "react";
import { Link } from "react-router-dom";
import $ from "jquery";
import styled from "styled-components";
import "../css/Menu.css";

const MenuPage = styled.div`
  display: none;
  position: fixed;
  left: ;
  top: 0;
  background-color: #fff2eb;
  padding: 0 5% 0 5%;
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
    font-size: 80%;background
  }
`;
const Menu = () => {
  return (
    <MenuPage className="mainmenu">
      <div style={{ verticalAlign: "bottom" }}>
        <Title>LAURENCE ININDA</Title>
        <MenuButton
          class="frame__button"
          onClick={() => {
            let menu = document.querySelector("div.mainmenu");
            console.log(menu);
            $(menu).css("display", "none");
          }}
        >
          <p className="showHover">Close</p>
        </MenuButton>
      </div>

      <div class="frame">
        <div class="frame__links">
          <a href="https://tympanus.net/codrops/?p=49748" class="frame__link">
            Article
          </a>
          <a
            href="https://github.com/codrops/ScrollLoopMenu/"
            class="frame__link"
          >
            GitHub
          </a>
        </div>
      </div>
      <nav class="menu">
        <div class="menu__item">
          <a class="menu__item-inner">Fascination Street</a>
        </div>
        <div class="menu__item">
          <a class="menu__item-inner">The Last Dance</a>
        </div>
        <div class="menu__item">
          <a class="menu__item-inner">Rebel Fantasies</a>
        </div>
        <div class="menu__item">
          <a class="menu__item-inner">Love Letters to Cipher</a>
        </div>
        <div class="menu__item">
          <a class="menu__item-inner">Henry and the Kids</a>
        </div>
        <div class="menu__item">
          <a class="menu__item-inner">Downtown Blank</a>
        </div>
        <div class="menu__item">
          <a class="menu__item-inner">Georgetown Blues</a>
        </div>
        <div class="menu__item">
          <a class="menu__item-inner">When Alice comes</a>
        </div>
        <div class="menu__item">
          <a class="menu__item-inner">A Rabbit's Dream</a>
        </div>
        <div class="menu__item">
          <a class="menu__item-inner">Schizophrenia House</a>
        </div>
        <div class="menu__item">
          <a class="menu__item-inner">Foundation Fabrics</a>
        </div>
        <div class="menu__item">
          <a class="menu__item-inner">Whenever Whatever</a>
        </div>
        <div class="menu__item">
          <a class="menu__item-inner">Feathers of Babel</a>
        </div>
        <div class="menu__item">
          <a class="menu__item-inner">Golden Freckles</a>
        </div>
      </nav>
    </MenuPage>
  );
};
export default Menu;
