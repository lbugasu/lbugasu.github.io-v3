import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import styled from "styled-components";
import { connect } from "react-redux";
import { readableDate } from "../components/helpers";

import { WritingFooter, MainHeader } from "../components";
import { getPosts } from "../state/selectors";
import { PostPreview } from "../components/";
const TagTitle = styled.h1`
  text-align: center;
  font-size: 300%;
  @media only screen and (max-width: 1200px) {
    font-size: 250%;
  }
  @media only screen and (max-width: 900px) {
    font-size: 200%;
  }
  @media only screen and (max-width: 600px) {
    font-size: 150%;
  }
`;
const Hr = styled.hr`
  border: none;
  height: 1px;
  background-color: #47261b;
  width: 60%;
`;

const TagPage = ({ posts }) => {
  const { subject } = useParams();
  let taggedPosts = posts.filter(
    (post) => post.fields.tags.indexOf(subject) !== -1
  );

  const renderPage = () => {
    return taggedPosts.map((post) => <PostPreview post={post} />);
  };

  return (
    <>
      <MainHeader />
      <TagTitle>{subject}</TagTitle>
      <Hr />
      {renderPage()}
      <WritingFooter />
    </>
  );
};
const mapStateToProps = (state) => ({
  posts: getPosts(state).posts,
});
export default connect(mapStateToProps)(TagPage);
