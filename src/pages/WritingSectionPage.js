import React from "react";
import { Link, useParams } from "react-router-dom";
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import { useSectionedPosts } from "../custom-hooks";
import { readableDate } from "../components/helpers";

// import WritingHeader from "../components/WritingHeader";
import WritingFooter from "../components/WritingFooter";
export default function WritingSectionPage({ match }) {
  const { section } = useParams();
  const [posts, isLoading] = useSectionedPosts(section);

  const renderPage = () => {
    if (isLoading) return <p>Loading...</p>;

    return posts.map((post) => (
      <div key={post.fields.title} className="postFrame">
        <Link
          key={"/writing/" + post.fields.slug}
          to={"/writing/" + post.fields.slug}
          className="preview"
        >
          <img
            src={post.fields.feature_image.fields.file.url}
            alt={post.title}
          />
          <small>{readableDate(post.fields.date)}</small>

          <h3>{post.fields.title}</h3>

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
      {/* <WritingHeader section={"/ " + section} /> */}
      {renderPage()}
      <WritingFooter />
    </div>
  );
}
