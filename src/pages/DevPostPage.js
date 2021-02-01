import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS } from "@contentful/rich-text-types";

import { useSingleExperiment } from "../custom-hooks";
import { readableDate } from "../components/helpers";
// import components
import MainHeader from "../components/MainHeader";
import ReactMarkdown from "react-markdown";
import styled from "styled-components";
// Syntax higlighter highlights syntax for code blocks
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  darcula,
  ghcolors,
  prism,
  synthwave84,
  vscDarkPlus,
} from "react-syntax-highlighter/dist/esm/styles/prism/";
import { CodeBlock } from "../components";
import "./Style.css";
import { lightfair } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { tomorrowNightEighties } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/hljs";
import Prism from "prismjs";

import { render } from "react-dom";
import Highlight, { defaultProps } from "prism-react-renderer";

import "./Style.css";
const gfm = require("remark-gfm");

/**
 * One can create a custom component for each element in the content block.
 * Reference: https://github.com/contentful/rich-text/tree/master/packages/rich-text-react-renderer
 * @param {*} param0
 */
const PostImage = ({ alt, url }) => (
  <div className="postImage">
    <img className="image" src={url} alt={alt}></img>
  </div>
);

const Side = styled.div`
  vertical-align: top;
  width: 20%;
  display: inline-block;
  margin-top: 2%;
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
const Aside = styled.aside`
  font-size: 14pt;
  border-left: 2px solid #735240;
  background-color: #f7e4d7;
  padding: 1%;
  margin-bottom: 1%;
  @media only screen and (max-width: 600px) {
    font-size: 12pt;
  }
`;
const codeStyle = {};
export default function PostPage() {
  const { id } = useParams();
  const [post, isLoading] = useSingleExperiment(id);
  useEffect(() => {
    Prism.highlightAll();
  });
  const options = {
    renderNode: {
      [BLOCKS.EMBEDDED_ASSET]: (node) => {
        const title = node.data.target.fields.title;
        const url = "https:" + node.data.target.fields.file.url;
        return <PostImage alt={title} url={url} />;
      },
    },
  };

  const renderPost = () => {
    if (isLoading) return <p>Loading...</p>;
    const renderers = {
      code: ({ language, value }) => {
        console.log(typeof value);
        return (
          <>
            <CodeBlock
              contenteditable={true}
              code={value.trim()}
              plugins={["line-numbers", "show-language"]}
              language={language}
            />
          </>
        );
      },
    };

    function printStuff() {
      return (
        <ReactMarkdown
          renderers={renderers}
          plugins={[gfm]}
          children={post.body}
        ></ReactMarkdown>
      );
    }
    // console.log(post.body);
    return (
      <>
        <MainHeader />
        <Side>
          <small>{readableDate(post.date)}</small>
        </Side>

        <Body>
          <Title> {post.title} </Title>
          <Date>{readableDate(post.date)}</Date>
          <Aside>{post.description}</Aside>
          <Image src={post.feature_image.fields.file.url}></Image>

          <Content>{printStuff()}</Content>
        </Body>
      </>
    );
  };
  return <div>{renderPost()}</div>;
}
