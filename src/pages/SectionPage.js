import React from "react";
import { Link, useParams } from "react-router-dom";
import { connect } from "react-redux";
import styled from "styled-components";

import { getPosts } from "../state/selectors";
import { MainHeader, WritingFooter, PostPreview } from "../components/";

const SectionPage = ({ posts }) => {
  const { section } = useParams();
  let sectionnedPosts = posts.filter((post) => {
    if (!!post.fields.section)
      return post.fields.section.indexOf(section) !== -1;
    else return false;
  });

  const renderPage = () => {
    return sectionnedPosts.map((post, i) => (
      <PostPreview post={post} divider={i !== posts.length - 1} />
    ));
  };
  return (
    <div className={section}>
      <MainHeader />
      <SectionTitle>{section}</SectionTitle>
      <div>{renderPage()}</div>
      <WritingFooter />
    </div>
  );
};
const mapStateToProps = (state) => ({
  posts: getPosts(state).posts,
});
export default connect(mapStateToProps)(SectionPage);

const SectionTitle = styled.h1`
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
