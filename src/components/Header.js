import React from "react";

// import {Link} from 'react-router-dom'
import Logo from "../css/images/logo.png";
const Header = () => (
  <div className="header">
    <div className="logo">
      <img src={Logo} />
    </div>
    <div className="menu">
      <a href="#about">about</a> • <a href="work">work</a> •{" "}
      <a href="writing">writing</a>
    </div>
  </div>
);
export default Header;
