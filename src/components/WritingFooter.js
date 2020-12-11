import React from "react";

import { Link } from "react-router-dom";

const WritingFooter = () => (
  <>
    <div className="footer">
      <hr className="footerLines" />
      <div className="footerSection">
        <h3>Subjects</h3>
        <Link to="/writing-subjects/faith">faith</Link>
        <Link to="/writing-subjects/blackness">blackness</Link>
        <Link to="/writing-subjects/pan-africanism">pan-africanism</Link>
        <Link to="/writing-subjects/love">love</Link>
        <Link to="/writing-subjects/death">death</Link>
        <Link to="/writing-subjects/travel">travel</Link>
      </div>
      <div className="footerSection">
        <h3>Sections</h3>
        <Link to="/writing-section/notes">notes</Link>
        <Link to="/writing-section/letters">letters</Link>
        <Link to="/writing-section/poetry">poetry</Link>
        <Link to="/writing-section/random">random</Link>
      </div>
      <div className="footerSection">
        <h3>More</h3>
        <Link to="/">home</Link>
        <Link to="/writing-currently">current writing</Link>
        <Link to="/writing-gallery">writing gallery</Link>
        <Link to="/projects">projects</Link>
        <Link to="/experiments">experiments</Link>
        <Link to="/africanpassport">
          african passport
          <span role="img" aria-label="radio">
            📻
          </span>
        </Link>
      </div>
      <div className="footerSection">
        <h3>Contact</h3>
        <Link to="/subscribe">subscribe</Link>
        <Link to="/write-to-me">write to me</Link>
        <Link to="/suggest-changes">suggest changes</Link>
      </div>
    </div>
  </>
);

export default WritingFooter;
