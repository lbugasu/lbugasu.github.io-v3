import React from "react";
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import { useParams } from "react-router-dom";

import { useSinglePost } from "../custom-hooks";

import { readableDate } from "../components/helpers";
import MainHeader from "../components/MainHeader";
import WritingFooter from "../components/WritingFooter";

export default function PostPage() {
  const { id } = useParams();
  const [post, isLoading] = useSinglePost(id);

  const renderPost = () => {
    if (isLoading) return <p>Loading...</p>;
    return (
      <div className="postPage">
        <MainHeader />
        <div className={`postbody ${post.section[0]}`}>
          <div
            className="postTitle"
            style={{
              backgroundImage: `url(${post.feature_image.fields.file.url})`,
            }}
          >
            <h1> {post.title} </h1>
            <small>{readableDate(post.date)}</small>
          </div>

          <p>{post.description}</p>
          <div
            className="postContent"
            dangerouslySetInnerHTML={{
              __html: documentToHtmlString(post.body),
            }}
          ></div>
        </div>

        <WritingFooter />
      </div>
    );
  };
  return <div className="post">{renderPost()}</div>;
}
