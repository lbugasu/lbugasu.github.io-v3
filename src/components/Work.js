import React from "react";

// import {Link} from 'react-router-dom'
export default function Work() {
  const projects = require("./projects.json");
  const printWork = () => {
    return projects.slice(0, 4).map((project) => (
      <div className="project">
        <div className="projectDescription">
          <h3>{project.title}</h3>
          <p>{project.description}</p>
        </div>
        <div className="projectImage">
          <img src={project.img} alt={project.title} />
        </div>
        <div className="projectStack">
          <h4>Sofware Stack:</h4>
          <ol>
            {project.tech.map((t) => (
              <li> • {t}</li>
            ))}
          </ol>
          <a
            className="seeWork"
            href={project.link}
            rel="noreferrer"
            target="_blank"
          >
            See Work➚
          </a>
        </div>
      </div>
    ));
  };
  return (
    <div id="work" className="projects">
      <h2>Selected Work & Projects</h2>
      {printWork()}
    </div>
  );
}
