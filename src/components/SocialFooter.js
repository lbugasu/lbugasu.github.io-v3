import React from "react";

import resume from "../css/images/resume.png";
import github from "../css/images/github2.png";
import behance from "../css/images/be.png";
import linkedIn from "../css/images/linkedIn.png";
const Footer = () => (
  <div className="elements">
    {/* <div className="element">
      <a
        href="https://1drv.ms/b/s!AqwJLYjZ0cXAhsdACEGkj8_UGb63cA?e=nTH29J"
        target="__blank"
      >
        <img src={resume} alt="resume"></img>
      </a>
    </div> */}
    {/* <div className="element">
      <a href="https://www.linkedin.com/in/laurence-ininda/" target="__blank">
        <img src={linkedIn} alt="linkedin link"></img>
      </a>
    </div> */}
    <div className="element">
      <a href="https://github.com/lbugasu" target="__blank">
        <img src={github} alt="github link"></img>
      </a>
    </div>
    <div className="element">
      <a href="https://dev.to/lbugasu">
        <img
          src="https://d2fltix0v2e0sb.cloudfront.net/dev-badge.svg"
          alt="Laurence Ininda's DEV Profile"
          height="50"
          width="50"
        ></img>
      </a>
    </div>
    <div className="element">
      <a href="https://www.behance.net/laurencebugasu" target="__blank">
        <img src={behance} alt="Behance site"></img>
      </a>
    </div>
    <div className="element">
      <a href="https://www.eyeem.com/u/laudebugs" target="__blank">
        <img
          src="https://s.cafebazaar.ir/1/icons/com.baseapp.eyeem_512x512.png"
          alt="EmeEm profile"
        ></img>
      </a>
    </div>

    <p className="copyright">© 2020</p>
  </div>
);
export default Footer;
