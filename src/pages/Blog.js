import React from "react";
import { Link } from "react-router-dom";
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";

import { usePosts } from "../custom-hooks";
import { readableDate } from "../components/helpers";

import MainHeader from "../components/MainHeader";
import WritingFooter from "../components/WritingFooter";

export default function Blog() {
  const [posts, isLoading] = usePosts();

  const renderPosts = () => {
    if (isLoading) return <p>Loading...</p>;
    return posts.map((post) => (
      <div className="subjectPostFrame">
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

          <h1>{post.fields.title}</h1>

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
    <div>
      <MainHeader section={"/gallery"} />
      <div>{renderPosts()}</div>
      <WritingFooter />
    </div>
  );
}
