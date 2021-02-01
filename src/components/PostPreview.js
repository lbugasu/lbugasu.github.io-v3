import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import { Link } from "react-router-dom";
import { readableDate } from "./helpers";
import { connect } from "react-redux";

import { getPosts } from "../state/selectors";

const PostPreview = ({ posts, post }) => {
  const [postLoaded, setLoading] = useState(false);
  useEffect(() => {
    if (!!post) {
      setLoading(true);
    }
  }, []);
  const showTags = (tagList) => {
    return tagList.map(function (tag, i) {
      const Tag = styled.small`
        margin: 0;
        font-size: 14pt;
        border-radius: 10px;
        margin: 0 0.5% 0 0.5%;
        padding: 0 1% 0 1%;
        @media only screen and (max-width: 600px) {
          font-size: 12pt;
        }
        background-color: var(
          ${posts.tags.find((tagObj) => tagObj.tag === tag).color}
        );
      `;

      return (
        <Link to={`/tag/${tag}`}>
          <Tag className={`tag ${tag}`}>{tag}</Tag>
        </Link>
      );
    });
  };
  if (!postLoaded) {
    return <div></div>;
  } else
    return (
      <div className="postFrame">
        <Link
          key={"/writing/" + post.fields.slug}
          to={`${
            post.sys.contentType.sys.id === "project" ? "/dev/" : "/writing/"
          }${post.fields.slug}`}
          className="preview"
        >
          <ImageFrame>
            <Image
              src={post.fields.feature_image.fields.file.url}
              alt={post.fields.title}
            />
          </ImageFrame>
        </Link>
        <PostData>
          <Link
            key={"/writing/" + post.fields.slug}
            to={`${
              post.sys.contentType.sys.id === "project" ? "/dev/" : "/writing/"
            }${post.fields.slug}`}
            className="preview"
          >
            <Title>{post.fields.title}</Title>
          </Link>
          <Small>{readableDate(post.fields.date)}</Small>
          {showTags(post.fields.tags)}
          <Link
            key={"/writing/" + post.fields.slug}
            to={`${
              post.sys.contentType.sys.id === "project" ? "/dev/" : "/writing/"
            }${post.fields.slug}`}
            className="preview"
          >
            <PhoneImage>
              <Image
                src={post.fields.feature_image.fields.file.url}
                alt={post.fields.title}
              />
            </PhoneImage>

            {!!post.fields.description ? (
              <Preview>{post.fields.description}</Preview>
            ) : (
              <Preview
                dangerouslySetInnerHTML={{
                  __html:
                    documentToHtmlString(post.fields.body).substring(0, 200) +
                    "   ... ",
                }}
              ></Preview>
            )}
          </Link>
        </PostData>

        <Hr />
      </div>
    );
};
const mapStateToProps = (state) => ({
  posts: getPosts(state),
});
export default connect(mapStateToProps)(PostPreview);

/**
 * Styled components
 */
const ImageFrame = styled.div`
  width: 28%;
  padding: 1%;
  display: inline-block;
  vertical-align: top;
  @media only screen and (max-width: 600px) {
    display: none;
  }
`;
const PhoneImage = styled.div`
  width: 100%;
  padding: 1%;
  display: none;
  vertical-align: top;
  @media only screen and (max-width: 600px) {
    display: block;
  }
`;
const Image = styled.img`
  width: 100%;
`;
const PostData = styled.div`
  width: 68%;
  margin-left: 1%;
  display: inline-block;
  @media only screen and (max-width: 600px) {
    width: 100%;
  }
`;
const Preview = styled.div`
  font-size: 14pt;
`;
const Title = styled.h3`
  @media only screen and (max-width: 600px) {
    font-size: 75%;
  }
`;
const Small = styled.small`
  font-size: 12pt;
`;

const Hr = styled.hr`
  width: 75%;
  float: left;
  border: none;
  height: 1px;
  display: block;
  /* Set the hr color */
  color: #47261b; /* old IE */
  background-color: #47261b; /* Modern Browsers */
`;
