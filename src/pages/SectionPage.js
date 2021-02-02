import React from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import styled from "styled-components";

import { getPosts } from "../state/selectors";
import {
  MainHeader,
  Footer,
  PostPreview,
  PoetryBanner,
  DevBanner,
  FictionBanner,
} from "../components/";

const SectionPage = ({ posts }) => {
  const { section } = useParams();
  let sectionnedPosts = posts.filter((post) => {
    if (!!post.fields.section)
      return post.fields.section.indexOf(section) !== -1;
    else return false;
  });
  const renderPage = () => {
    return sectionnedPosts.map((post, i) => (
      <PostPreview post={post} divider={i !== sectionnedPosts.length - 1} />
    ));
  };
  return (
    <div className={section}>
      <MainHeader />
      {section === "poetry" ? <PoetryBanner /> : <></>}
      {section === "dev" ? <DevBanner devPosts={sectionnedPosts} /> : <></>}
      {section === "fiction" ? <FictionBanner /> : <></>}
      <div>{renderPage()}</div>
      <Footer />
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
