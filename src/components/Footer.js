import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
const Hr = styled.hr`
  width: 100%;
  border: none;
  height: 0.5px;
  display: block;
  /* Set the hr color */
  color: var(--hr); /* old IE */
  background-color: var(--hr); /* Modern Browsers */
`;

const Footer = () => (
  <>
    <div className="footer">
      <Hr />
      <div className="footerSection">
        <h3>Tags</h3>
        <Link to="/tag/faith">faith ✝</Link>
        <Link to="/tag/hope">☸ hope</Link>
        <Link to="/tag/love">love ♥</Link>
      </div>
      <div className="footerSection">
        <h3>Sections</h3>
        <Link to="/section/notes">notes</Link>
        <Link to="/section/letters">letters</Link>
        <Link to="/section/poetry">poetry</Link>
        <Link to="/vault">vault</Link>
      </div>
      <div className="footerSection">
        <h3>More</h3>
        <Link to="/">home</Link>
        <Link to="/">progress reports</Link>
        <Link to="/experiments">Experiments</Link>
      </div>
      <div className="footerSection">
        <h3>Contact</h3>
        <Link to="/about">about</Link>
        <Link to="/contact">write to me✎</Link>
      </div>
    </div>
  </>
);

export default Footer;
