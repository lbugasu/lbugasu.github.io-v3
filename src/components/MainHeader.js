import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import styled from "styled-components";
import $ from "jquery";

const MainHeader = () => {
  const [mode, setMode] = useState("light");
  /**
   * JQuery function to listen to when a user scrolls
   */
  useEffect(() => {
    let menuItem = document.getElementById("floating-menu");
    $(window).scroll(function () {
      var currentScroll = $(window).scrollTop(); // get current position
      // Only show the icon if the window width is greater than 700px
      if ($(window).width() > 700) {
        if (currentScroll >= 200) {
          menuItem.style.visibility = "visible";

          // menuItem.style.display = "block";
          // apply position: fixed if you
          if (menuItem.classList.contains("fade-out"))
            $(menuItem).removeClass("fade-out");
          $(menuItem).addClass("fade-in");
          menuItem.style.opacity = "1 ";
        } else {
          // apply position: static
          // if you scroll above it
          if (menuItem.classList.contains("fade-in"))
            $(menuItem).removeClass("fade-in");
          $(menuItem).addClass("fade-out");
          menuItem.style.opacity = "0 ";
          menuItem.style.visibility = "hidden";
        }
      }
    });
  });

  const Header = styled.div`
    border-bottom: 1px solid var(--hr);
  `;
  const Title = styled.div`
    width: 50%;
    display: inline-block;
    font-weight: 600;
    font-family: "Etoile";
    font-size: 150%;
    margin: 0;
    @media only screen and (max-width: 900px) {
      font-size: 125%;

      width: 65%;
    }
    @media only screen and (max-width: 600px) {
      font-size: 125%;

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
      font-size: 125%;

      width: 35%;
    }
    @media only screen and (max-width: 600px) {
      font-size: 150%;
      width: 25%;
    }
  `;
  const Up = styled.span`
    font-size: 80%;
    line-height: 12pt;
  `;
  const Floating = styled.div`
    position: -webkit-sticky;
    position: sticky;
    top: 0;
    right: 0;
    position: fixed;
    float: right;
    padding-right: 8.25%;
    visibility: hidden;
    ${"" /* display: none; */}
    opacity: 0;
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
    :hover {
      cursor: pointer;
    }
  `;
  const LightToggle = styled.span`
    font-size: 65%;
    padding: 2%;
    height: 100%;
    vertical-align: middle;
    opacity: 0.7;
    :hover {
      cursor: pointer;
    }
  `;
  function toggleMode() {
    // If the user's OS setting is dark and matches our .dark-mode class...
    console.log(localStorage);

    const currentTheme = localStorage.getItem("theme");

    if (currentTheme === "dark" || currentTheme === null) {
      // ...let's toggle the .dark-theme class on the body
      document.body.classList.toggle("dark-mode");
      document.body.classList.toggle("light-mode");

      localStorage.setItem("theme", "light");
      setMode("dark");
      // Otherwise, if the user's preference in localStorage is light...
    } else if (currentTheme === "light") {
      // ...let's toggle the .light-theme class on the body
      document.body.classList.toggle("light-mode");
      document.body.classList.toggle("dark-mode");

      localStorage.setItem("theme", "dark");
      setMode("light");
    }
  }

  return (
    <>
      <Header id={"up"}>
        <Title>
          <Link to="/">LAURENCE ININDA</Link>
        </Title>
        <Menu>
          <LightToggle className="btn-toggle" onClick={toggleMode}>
            {mode === "light" ? <>🌑</> : <>🌕</>}
          </LightToggle>
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
      <Floating id="floating-menu">
        <FloatingMenu>
          <Up>
            <HashLink
              smooth
              to={` up`}
              onClick={() => {
                let menuItem = document.getElementById("floating-menu");

                if (menuItem.classList.contains("fade-in"))
                  $(menuItem).removeClass("fade-in");
                menuItem.style.display = "none";
              }}
            >
              ⍙{" "}
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
