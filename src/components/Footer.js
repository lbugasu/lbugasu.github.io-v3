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
const Section = styled.div`
  width: 20%;
  margin: 0 2% 0 3%;
  display: inline-block;
  vertical-align: top;
  @media only screen and (max-width: 800px) {
    width: 45%;
    text-align: center;
    margin: 0 2% 0 3%;
  }
`;
const FooterFrame = styled.div`
  padding: 0 5% 0 5%;
  font-size: 90%;
`;

const Footer = () => (
  <>
    <FooterFrame className="footer">
      <Hr />
      <Section>
        <h3>Tags</h3>
        <Link to="/tag/faith">faith ✝</Link>
        <Link to="/tag/hope">☸ hope</Link>
        <Link to="/tag/love">love ♥</Link>
      </Section>
      <Section>
        <h3>Sections</h3>
        <Link to="/section/notes">notes</Link>
        <Link to="/section/letters">letters</Link>
        <Link to="/section/poetry">poetry</Link>
        <Link to="/vault">vault</Link>
      </Section>
      <Section>
        <h3>More</h3>
        <Link to="/">home</Link>
        <Link to="/">progress reports</Link>
        <Link to="/experiments">Experiments</Link>
      </Section>
      <Section>
        <h3>Contact</h3>
        <Link to="/about">about</Link>
        <Link to="/contact">write to me✎</Link>
      </Section>
    </FooterFrame>
  </>
);

export default Footer;
