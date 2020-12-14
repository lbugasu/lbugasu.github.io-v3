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
  </div>
);
export default Header;
