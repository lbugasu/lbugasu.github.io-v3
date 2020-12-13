import React from "react";

import MainHeader from "../components/MainHeader";
import AboutMe from "../components/AboutMe";
import Work from "../components/Work";
import Misc from "../components/Misc";

export default function About() {
  return (
    <div>
      <MainHeader />
      <AboutMe />
      <Work />
      <Misc />
    </div>
  );
}
