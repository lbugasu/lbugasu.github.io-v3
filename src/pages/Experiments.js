import React from "react";
import { Link } from "react-router-dom";
import { readableDate } from "../components/helpers";
import MainHeader from "../components/MainHeader";

// import ExperimentsHeader from "../components/ExperimentsHeader";
import { useProjects } from "../custom-hooks/";

export default function Experiments() {
  const [projects, isLoading] = useProjects();
  console.log(projects);
  const renderProjects = () => {
    if (isLoading) return <p>Loading...</p>;
    return projects.map((project) => (
      <div className="project">
        <h3>{project.fields.title}</h3>
        <img
          src={project.fields.featureImage.fields.file.url}
          alt={project.fields.featureImage.title}
        ></img>
        <small>{readableDate(project.fields.date)}</small>
        <div className="projectDescription">{project.fields.description}</div>
        <Link
          key={"/experiments/" + project.fields.slug}
          to={"/experiments/" + project.fields.slug}
          className="preview"
        >
          <p>read more...</p>
        </Link>
      </div>
    ));
  };
  return (
    <>
      <MainHeader />
      {renderProjects()}
      <div className="ecstasy">
        <p>an aminated dream...</p>
        <p></p>
        <iframe
          className="ecstasy"
          src="https://player.vimeo.com/video/435519745"
          width="640"
          height="480"
          frameborder="0"
          allow="autoplay; fullscreen"
          allowfullscreen
          title="Ecstasy"
        ></iframe>
      </div>
    </>
  );
}
