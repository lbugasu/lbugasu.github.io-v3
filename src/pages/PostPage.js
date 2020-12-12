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
        <div id={post.section} style={{ padding: "2.5% 10% 2.5% 10%" }}>
          <div>
            <div
              style={{
                height: "50vh",
                backgroundSize: "40%",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right",
                backgroundImage: `url(${post.feature_image.fields.file.url})`,
              }}
            >
              <h1
                style={{
                  fontSize: "600%",
                  width: "80%",
                  paddingTop: "2.5%",
                  // mixBlendMode: "difference",
                }}
              >
                {post.title}
              </h1>
              <small>{readableDate(post.date)}</small>
            </div>

            <p>{post.description}</p>
          </div>
          <div
            style={{ padding: "2.5%", lineHeight: "125%" }}
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
