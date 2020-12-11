import React from "react";
import { HashLink } from "react-router-hash-link";
import { Link } from "react-router-dom";
// import {Link} from 'react-router-dom'
import Logo from "../css/images/logo.png";
import LogoLight from "../css/images/logo-light.png";
const MainHeader = () => (
  <div className="mainheader">
    <div className="menubutton">
      <span className="specialChar ">x</span>
    </div>
    <div className="laurence">
      <h1>LAURENCE ININDA</h1>
    </div>
    <div className="menuoptions">
      <h2>
        <Link key={"/writing-section/poetry"} to={"/writing-section/poetry"}>
          POETRY
        </Link>
      </h2>
      <h2>FICTION</h2>
      <h2>BLOG</h2>
      <h2>
        <Link to="/about">ABOUT</Link>
      </h2>
    </div>
  </div>
);
export default MainHeader;
