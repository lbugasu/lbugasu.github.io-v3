import React from "react";
import { HashLink } from "react-router-hash-link";
// import {Link} from 'react-router-dom'
import Logo from "../css/images/logo.png";
import LogoLight from "../css/images/logo-light.png";
const Header = () => (
  <div>
    <div className="header" id="top">
      <div className="logo">
        <HashLink id="about" smooth to="#top">
          <img
            src="url(https://raw.githubusercontent.com/lbugasu/lbugasu.github.io/master/src/css/images/logo.png)"
            alt="logo"
          />
        </HashLink>
      </div>
      <div className="menu" id="nonScrolling">
        <span className="lightDark">
          <span className="lightMode">🌕</span>
          <span className="darkMode">🌑</span>
        </span>
        <HashLink smooth to="#about">
          about
        </HashLink>{" "}
        •{" "}
        <HashLink smooth to="#work">
          work
        </HashLink>{" "}
        •{" "}
        <HashLink smooth to="#writing">
          writing
        </HashLink>
      </div>
    </div>
    <div className="header" id="scrolling">
      <div className="logo">
        <HashLink smooth to="#top">
          <img src={LogoLight} alt="logo" />
        </HashLink>
      </div>
      <div className="menu">
        <HashLink smooth to="#about">
          about
        </HashLink>{" "}
        •{" "}
        <HashLink smooth to="#work">
          work
        </HashLink>{" "}
        •{" "}
        <HashLink smooth to="#writing">
          writing
        </HashLink>
      </div>
    </div>
  </div>
);
export default Header;
