import React from "react";
import { HashLink } from "react-router-hash-link";
// import {Link} from 'react-router-dom'
import Logo from "../css/images/logo.png";
const Header = () => (
  <div className="header">
    <div className="logo">
      <img src={Logo} alt="logo" />
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
);
export default Header;
