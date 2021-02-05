import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import styled from "styled-components";
import $ from "jquery";

const MainHeader = () => {
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
  `;
  function toggleMode() {
    // If the user's OS setting is dark and matches our .dark-mode class...
    if (prefersDarkScheme.matches) {
      // ...then toggle the light mode class
      document.body.classList.toggle("light-mode");
      // ...but use .dark-mode if the .light-mode class is already on the body,
      var theme = document.body.classList.contains("light-mode")
        ? "light"
        : "dark";
    } else {
      // Otherwise let's do the same thing, but for .dark-mode
      document.body.classList.toggle("dark-mode");
      var theme = document.body.classList.contains("dark-mode")
        ? "dark"
        : "light";
    }
    // Finally, let's save the current preference to localStorage to keep using it
    localStorage.setItem("theme", theme);
  }

  return (
    <>
      <Header id={"up"}>
        <Title>
          <Link to="/">LAURENCE ININDA</Link>
        </Title>
        <Menu>
          <LightToggle className="btn-toggle" onClick={toggleMode()}>
            🌕🌑
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
