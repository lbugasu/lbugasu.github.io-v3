import React from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import { readableDate } from "../components/helpers";
import MainHeader from "../components/MainHeader";

// import ExperimentsHeader from "../components/ExperimentsHeader";
import { useProjects } from "../custom-hooks";

export default function Experiments() {
  const [projects, isLoading] = useProjects();
  console.log(projects);
  const renderProjects = () => {
    if (isLoading) return <p>Loading...</p>;
    return projects.map((project) => (
      <div className="devframe">
        <h2 >{project.fields.title}</h2>

        <small style={{ fontSize: "16pt" }}>
          {readableDate(project.fields.date)}
        </small>
        <div className="">{project.fields.description}</div>
        <Link
          key={"/dev/" + project.fields.slug}
          to={"/dev/" + project.fields.slug}
          className="preview"
        >
          <p>read more➚</p>
        </Link>
        <hr className="divider" />
      </div>
    ));
  };
  return (
    <>
      <MainHeader />
      <div className="devPosts">
        <h3 style={{ padding: "1% 0 1% 0" }}>Recent Posts</h3>

        {renderProjects()}
      </div>
      <Footer />
    </>
  );
}
