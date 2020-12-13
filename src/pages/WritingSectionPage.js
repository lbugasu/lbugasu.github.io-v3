import React from "react";
import { Link, useParams } from "react-router-dom";
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import { useSectionedPosts } from "../custom-hooks";
import { readableDate } from "../components/helpers";

import MainHeader from "../components/MainHeader";
import WritingFooter from "../components/WritingFooter";

export default function WritingSectionPage({ match }) {
  const { section } = useParams();
  const [posts, isLoading] = useSectionedPosts(section);
  console.log(section);
  const renderPage = () => {
    if (isLoading) return <p>Loading...</p>;

    return posts.map((post) => (
      <div key={post.fields.title} className="postitem">
        <Link
          key={"/writing/" + post.fields.slug}
          to={"/writing/" + post.fields.slug}
          className="preview"
        >
          <h1 style={{ fontWeight: "600", fontSize: "150%" }}>
            {post.fields.title}
          </h1>

          <img
            src={post.fields.feature_image.fields.file.url}
            alt={post.title}
            style={{ left: "0", float: "right" }}
          />
          <small>{readableDate(post.fields.date)}</small>

          <p>{post.fields.description}</p>
          <div
            className="postPreview"
            dangerouslySetInnerHTML={{
              __html:
                documentToHtmlString(post.fields.body).substring(0, 200) +
                "   ... ",
            }}
          ></div>
        </Link>
      </div>
    ));
  };
  return (
    <div className={section}>
      <MainHeader />
      <div>{renderPage()}</div>
      <WritingFooter />
    </div>
  );
}
