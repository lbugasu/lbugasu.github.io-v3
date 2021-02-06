import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import { Link } from "react-router-dom";
import { readableDate } from "./helpers";
import { connect } from "react-redux";

import { getPosts } from "../state/selectors";

/**
 * Takes three props:
 * posts - the list of posts in the state
 * post - the post to be displayed
 * divider - whether or not to display the divider -
 *         - useful when displaying many posts in a list
 */
const PostPreview = ({ posts, post, divider }) => {
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
      <PreviewFrame key={post.fields.slug}>
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
        {divider ? <Hr /> : <></>}
      </PreviewFrame>
    );
};
const mapStateToProps = (state) => ({
  posts: getPosts(state),
});
export default connect(mapStateToProps)(PostPreview);

/**
 * Styled components
 */
const PreviewFrame = styled.div`
  background-color: var(--item-bg);
  border-radius: 25px;
  margin-bottom: 1%;
  padding: 0.5%;
`;
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
  margin-left: 1%;
  height: 1px;
  display: block;
  /* Set the hr color */
  color: var(--hr); /* old IE */
  background-color: var(--hr); /* Modern Browsers */
`;
