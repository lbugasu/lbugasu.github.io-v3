import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { getPosts } from "../../state/selectors";
import { Link } from "react-router-dom";
// Banner Image
import bg_image from "../../css/images/tech_photo_bg.jpg";
import github from "../../css/images/GithubLight.png";
const Funcs = require("../helpers");

const Header = styled.div`
  background-image: url(${bg_image});
  border-radius: 5px;
`;
/**
 * TODO: Remove the mix-blend-mode whenever there is something else overlaying
 */
const H1 = styled.div`
  width: 40%;
  display: inline-block;
  color: var(--h1-banner);
  font-weight: 600;
  font-size: 600%;
  text-align: center;
  font-family: "Cascadia Code";
  @media only screen and (max-width: 1200px) {
    font-size: 450%;
  }
  @media only screen and (max-width: 900px) {
    font-size: 300%;
  }
  @media only screen and (max-width: 600px) {
    font-size: 200%;
  }
`;

const Tags = styled.div`
  margin: 1%;
  padding: 0.5%;
  background-color: var(--dev-tags-bg);

  width: 28%;
  display: inline-block;
  border-radius: 10px;
  vertical-align: middle;
`;
const Links = styled.div`
  width: 28%;
  display: inline-block;
  text-align: right;
`;
const Icon = styled.img`
  width: 40px;
`;
const DevBanner = ({ allTags, devPosts }) => {
  let tags = [];
  devPosts.map((post) => {
    post.fields.tags.map((tag) => {
      if (tags.indexOf(tag) === -1) {
        tags.push(tag);
      }
    });
  });
  console.log(allTags);
  let devTags = [];

  tags.map((tag) => {
    let currentTag = allTags.find((target) => target.tag === tag);
    devTags.push(currentTag);
  });
  /**
   * Sort Tags based on whichever has the most posts
   */
  devTags.sort(function (a, b) {
    return b.count - a.count;
  });
  console.log(devTags);
  const renderTags = () => {
    return devTags.map((tag) => {
      const Tag = styled.p`
        display: inline-block;
        margin: 0;
        font-size: 14pt;
        border-radius: 10px;
        margin: 0.5%;
        padding: 0 1% 0 1%;
        @media only screen and (max-width: 600px) {
          font-size: 12pt;
        }
        background-color: var(${tag.color});
      `;
      return (
        <Link to={`/section/dev/?tag=${tag.tag}`} key={tag.tag}>
          <Tag className={`tag ${tag}`}>{tag.tag}</Tag>
        </Link>
      );
    });
  };
  return (
    <Header>
      <Tags>{renderTags()}</Tags>
      <H1>{`<Dev/>`}</H1>
      <Links>
        <a href="https://github.com/lbugasu" target="_blank" rel="noreferrer">
          <Icon src={github} />
        </a>
      </Links>
    </Header>
  );
};
const mapStateToProps = (state) => ({
  allTags: getPosts(state).tags,
});
export default connect(mapStateToProps)(DevBanner);
