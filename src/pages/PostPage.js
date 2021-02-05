import React from "react";
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import styled from "styled-components";
import { readableDate } from "../components/helpers";
import {
  MainHeader,
  CommentArea,
  Footer,
  LikeButton,
  Loading,
} from "../components";
import { getPosts } from "../state/selectors";

const Side = styled.div`
  vertical-align: top;
  width: 20%;
  display: inline-block;
  margin-top: 2%;
  ${"" /* TODO: Add responsiveness here */}
  @media only screen and (max-width: 1200px) {
    width: 10%;
  }
  @media only screen and (max-width: 900px) {
    display: none;
  }
  position: -webkit-sticky;
  position: sticky;
  top: 0;
`;
const Body = styled.div`
  width: 60%;
  display: inline-block;
  @media only screen and (max-width: 1200px) {
    width: 90%;
  }
  @media only screen and (max-width: 900px) {
    width: 100%;
  }
`;
const Stats = styled.div`
  vertical-align: top;
  width: 20%;
  display: inline-block;
  margin-top: 2%;
  position: -webkit-sticky;
  position: sticky;
  top: 25vh;
  ${"" /* TODO: Add responsiveness here */}

  @media only screen and (max-width: 1200px) {
    padding-top: 0;
    width: 100%;
    position: relative;
    margin: 0;
    top: 0;
    text-align: right;
  }
`;

const Date = styled.small`
  display: none;
  @media only screen and (max-width: 900px) {
    display: inline-block;
    font-size: 50%;
  }
`;
const Title = styled.h1`
  font-size: 500%;
  padding-top: 2.5;
  @media only screen and (max-width: 1200px) {
    font-size: 400%;
  }
  @media only screen and (max-width: 900px) {
    font-size: 200%;
  }
  @media only screen and (max-width: 600px) {
    font-size: 150%;
  }
`;
const Image = styled.img`
  width: 100%;
`;
const Content = styled.div`
  @media only screen and (max-width: 900px) {
    font-size: 100%;
  }
  @media only screen and (max-width: 600px) {
    font-size: 75%;
  }
`;
const PostDate = styled.small`
  margin-top: 5%;
  display: inline-block;
`;
const PostPage = ({ posts }) => {
  const { id } = useParams();
  const renderPost = () => {
    if (!posts.postsLoaded) return <Loading />;
    const post = posts.posts.find((post) => post.fields.slug === id).fields;
    return (
      <div>
        <MainHeader />
        <Side>
          <PostDate>{readableDate(post.date)}</PostDate>
        </Side>

        <Body className={`${post.section[0]}`}>
          <Title> {post.title} </Title>
          <Date>{readableDate(post.date)}</Date>
          <p>{post.description}</p>
          <Image src={post.feature_image.fields.file.url}></Image>

          <Content
            dangerouslySetInnerHTML={{
              __html: documentToHtmlString(post.body),
            }}
          ></Content>
        </Body>
        <Stats>
          <LikeButton slug={post.slug} />
        </Stats>
        <CommentArea slug={post.slug} />
        <Footer />
      </div>
    );
  };
  return <div className="post">{renderPost()}</div>;
};
const mapStateToProps = (state) => ({
  posts: getPosts(state),
});
export default connect(mapStateToProps)(PostPage);
