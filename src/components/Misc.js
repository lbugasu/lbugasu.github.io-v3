import React from "react";

import resume from "../css/images/resume.png";
import github from "../css/images/github2.png";
import behance from "../css/images/be.png";
import linkedIn from "../css/images/linkedIn.png";
const Header = () => (
  <div className="misc">
    {/* <hr className="separator" /> */}
    <p className="separator">• • •</p>
    <div className="sharable">
      <h3 className="title">Curated music and podcasts</h3>
      <div className="media">
        <iframe
          title="I'm no good"
          className="spotify"
          src="https://open.spotify.com/embed/playlist/4HeMBaJyp57htpBuJxbk8C"
          height="480"
          frameborder="0"
          allowtransparency="true"
          allow="encrypted-media"
        ></iframe>
      </div>
      <div className="media">
        <iframe
          src="https://open.spotify.com/embed-podcast/episode/1iDzfqn3ydQSxgfai96sYR"
          height="160"
          frameborder="0"
          a
          llowtransparency="true"
          allow="encrypted-media"
          title="Rev. Otis Moss IIIThe Sound of the Genuine: Traversing 2020 with ‘the Mystic of the Movement’ Howard Thurman"
        ></iframe>
        <iframe
          title="tones for a black president"
          height="120"
          src="https://www.mixcloud.com/widget/iframe/?hide_cover=1&light=1&feed=%2FBrightmoments%2Ftones-for-a-black-president%2F"
          frameborder="0"
        ></iframe>
        <iframe
          src="https://open.spotify.com/embed-podcast/episode/4Nu3MqXpYurA5y7s6aL0vq"
          height="160"
          frameborder="0"
          allowtransparency="true"
          allow="encrypted-media"
          title="Making Amends"
        ></iframe>
      </div>
    </div>

    <div className="elements">
      <div className="element">
        <a
          href="https://1drv.ms/b/s!AqwJLYjZ0cXAhstzK9rzikD5MqzOAw"
          target="__blank"
        >
          <img src={resume} alt="resume"></img>
        </a>
      </div>
      <div className="element">
        <a href="https://www.linkedin.com/in/laurence-ininda/" target="__blank">
          <img src={linkedIn} alt="linkedin link"></img>
        </a>
      </div>
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
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Eyeem.png/250px-Eyeem.png"
            alt="EmeEm profile"
          ></img>
        </a>
      </div>
    </div>

    <p className="copyright">© 2020</p>
  </div>
);
export default Header;
