import React from "react";

import { connect } from "react-redux";
import { HashLink } from "react-router-hash-link";
import styled from "styled-components";
import { MainHeader, Footer, Loading, SecondaryHeader } from "../components";
import { getPosts } from "../state/selectors";
import { PostPreview } from "../components";
const Vault = ({ posts }) => {
  const yearBar = (years) => {
    years = years.sort((a, b) => b - a);
    console.log(years);
    return years.map((year) => {
      return (
        <HashLink smooth to={`#${year}`}>
          <ALink>― {year}</ALink>
        </HashLink>
      );
    });
  };
  const renderPosts = () => {
    if (posts.postsLoading) {
      return <Loading />;
    } else {
      let years = [];
      let tags = [];
      let sections = [];
      let postList = {};
      posts = posts.posts.filter((post) => !post.tags.includes("preview"));
      posts.map((post) => {
        let year = String(new Date(post.date).getFullYear());
        if (years.indexOf(year) === -1) {
          years.push(year);
        }
        if (year in postList) {
          postList[year] = [...postList[year], post];
        } else {
          postList[year] = [post];
        }
      });
      let list = [];
      for (let year in postList) {
        list.push(postList[year]);
      }
      list = list.sort(function (a, b) {
        return new Date(b[0].date) - new Date(a[0].date);
      });
      let showPosts = () => {
        return list.map((year) => {
          console.log(year);
          return (
            <div id={new Date(year[0].date).getFullYear()}>
              <Yr>{new Date(year[0].date).getFullYear()}</Yr>
              {year.map((post, i) => {
                return (
                  <PostPreview post={post} divider={i !== year.length - 1} />
                );
              })}
            </div>
          );
        });
      };

      return (
        <div>
          <Years>{yearBar(years)}</Years>
          {showPosts()}
        </div>
      );
    }
  };
  return (
    <div>
      <MainHeader />
      <SecondaryHeader />
      {renderPosts()}
      <Footer />
    </div>
  );
};

const mapStateToProps = (state) => ({
  posts: getPosts(state),
});
const mapDispatchToProps = (dispatch) => ({});
export default connect(mapStateToProps, mapDispatchToProps)(Vault);

const ALink = styled.span`
  :hover {
    font-style: italic;
    font-size: 150%;
  }
  display: block;
  @media only screen and (max-width: 600px) {
    display: inline-block;
    :hover {
      font-style: italic;
      font-size: 100%;
    }
  }
`;
const Yr = styled.p`
  font-size: 200%;
  width: 100%;
  text-align: left;
`;
const Years = styled.div`
  width: 20%;
  float: right;
  position: fixed;
  left: 90%;
  @media only screen and (max-width: 900px) {
    width: 30%;

    position: absolute;
    position: -webkit-sticky;
    position: sticky;
    top: 100;
    right: -50%;
    text-align: right;
  }
  @media only screen and (max-width: 600px) {
    position: relative;
    width: 100%;
    top: 0;
    left: 0;
    float: left;
  }
`;
