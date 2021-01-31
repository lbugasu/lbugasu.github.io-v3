import React from "react";
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useSinglePost } from "../custom-hooks";
import { readableDate } from "../components/helpers";
import { MainHeader } from "../components";
import WritingFooter from "../components/WritingFooter";

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
export default function PostPage() {
  const { id } = useParams();
  const [post, isLoading] = useSinglePost(id);

  const renderPost = () => {
    if (isLoading) return <p>Loading...</p>;
    return (
      <div>
        <MainHeader />
        <Side>
          <small>{readableDate(post.date)}</small>
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

        <WritingFooter />
      </div>
    );
  };
  return <div className="post">{renderPost()}</div>;
}
