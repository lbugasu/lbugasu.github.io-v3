import React from "react";

import { useFeed } from "../custom-hooks/";

//import components
import MainHeader from "../components/MainHeader";
import About from "../components/About";
import Work from "../components/Work";
import Misc from "../components/Misc";
import { Link } from "react-router-dom";
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import { readableDate } from "../components/helpers";

import { usePosts } from "../custom-hooks/";

export default function HomePage() {
  const [posts, isLoading] = usePosts();

  const renderPosts = () => {
    if (isLoading) return <p>Loading...</p>;

    return posts.map((post) => (
      <div className="postFrame">
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

  const showPosts = () => {
    // Perhaps add animation to homepage when laoding
    if (isLoading) return <p>Loading</p>;
    // Render only the first three posts

    return posts.slice(0, 3).map((post) => (
      <div className="singlePost">
        <h4>{post.title}</h4>
        <h5>{post.pubDate.substring(0, 16)}</h5>
        <p>
          <a href={post.link}>Read➚</a>
        </p>
      </div>
    ));
  };
  // Render the homepage
  return (
    <div className="content">
      <MainHeader />
      <div>
        <h3>LATEST</h3>
        {renderPosts()}
      </div>
    </div>
  );
}
