import React from "react";

import { Link } from "react-router-dom";

const WritingFooter = () => (
  <>
    <div className="footer">
      <hr className="footerLines" />
      <div className="footerSection">
        <h3>Subjects</h3>
        <Link to="/writing-subjects/faith">faith</Link>
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
        <Link to="/africanpassport">
          african passport
          <span role="img" aria-label="radio">
            📻
          </span>
        </Link>
      </div>
      <div className="footerSection">
        <h3>Contact</h3>
        <Link to="/about">about</Link>
      </div>
    </div>
  </>
);

export default WritingFooter;
