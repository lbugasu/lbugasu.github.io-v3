import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { connect } from "react-redux";

import { Footer, MainHeader, SecondaryHeader } from "../components";
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
  width: 60%;
  border: none;
  height: 1px;
  display: block;
  /* Set the hr color */
  color: var(--hr); /* old IE */
  background-color: var(--hr); /* Modern Browsers */
`;
const PostsFrame = styled.div`
  margin: 0 17.5% 0 17.5%;
  width: 65%;
  @media only screen and (max-width: 1200px) {
    margin: 0 15% 0 15%;
    width: 70%;
  }
  @media only screen and (max-width: 900px) {
    margin: 0 7.5% 0 7.5%;
    width: 85%;
  }
  @media only screen and (max-width: 600px) {
    margin: 0 2.5% 0 2.5%;
    width: 95%;
  }
`;
const TagPage = ({ posts }) => {
  const { subject } = useParams();
  let taggedPosts = posts.filter((post) => post.tags.indexOf(subject) !== -1);

  const renderPage = () => {
    return taggedPosts.map((post, i) => (
      <PostPreview post={post} divider={i !== taggedPosts.length - 1} />
    ));
  };

  return (
    <>
      <MainHeader />
      <SecondaryHeader />
      <TagTitle>{subject}</TagTitle>
      <Hr />
      <PostsFrame>{renderPage()}</PostsFrame>
      <Footer />
    </>
  );
};
const mapStateToProps = (state) => ({
  posts: getPosts(state).posts,
});
export default connect(mapStateToProps)(TagPage);
