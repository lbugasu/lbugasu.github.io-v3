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
  LettersBanner,
  ScrollToTopOnMount,
  SecondaryHeader,
} from "../components/";

const SectionPage = ({ posts }) => {
  const { section } = useParams();
  console.log(section);
  let sectionnedPosts = posts.filter((post) => {
    if (!!post.section) return post.section.indexOf(section) !== -1;
    else return false;
  });

  const renderPage = () => {
    return sectionnedPosts.map((post, i) => (
      <PostPreview post={post} divider={i !== sectionnedPosts.length - 1} />
    ));
  };
  const renderTitle = (section) => {
    switch (section) {
      case "poetry":
        return <PoetryBanner />;
      case "dev":
        return <DevBanner devPosts={sectionnedPosts} />;
      case "fiction":
        return <FictionBanner />;
      case "letters":
        return <LettersBanner />;
      default:
        return (
          <SectionTitle>
            {section}
            <Hr />
          </SectionTitle>
        );
    }
  };
  return (
    <div className={section}>
      <ScrollToTopOnMount />
      <MainHeader />
      <SecondaryHeader />
      {renderTitle(section)}
      <Posts>{renderPage()}</Posts>
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
const Posts = styled.div`
  width: 80%;
  padding: 0 10% 0 10%;
  @media only screen and (max-width: 900px) {
    width: 90%;
    padding: 0 5% 0 5%;
  }
  @media only screen and (max-width: 700px) {
    width: 100%;
    padding: 0 0% 0 0%;
  }
`;
const Hr = styled.hr`
  width: 75%;
  border: none;
  height: 1px;
  display: block;
  /* Set the hr color */
  color: var(--hr); /* old IE */
  background-color: var(--hr); /* Modern Browsers */
`;
