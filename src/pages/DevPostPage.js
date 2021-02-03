import React from "react";
import { useParams } from "react-router-dom";
import { BLOCKS } from "@contentful/rich-text-types";
import { connect } from "react-redux";
import { getPosts } from "../state/selectors";
import { readableDate } from "../components/helpers";

// import components
import { MainHeader, LikeButton } from "../components";
import ReactMarkdown from "react-markdown";
import { HashLink } from "react-router-hash-link";
import styled from "styled-components";

// Syntax higlighter highlights syntax for code blocks
import markdownHeadings from "markdown-headings";
import Highlight, { defaultProps } from "prism-react-renderer";

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
    width: 15%;
  }
  @media only screen and (max-width: 900px) {
    display: none;
  }
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  margin-top: 25%;
`;
const Body = styled.div`
  width: 60%;
  display: inline-block;
  @media only screen and (max-width: 1200px) {
    width: 70%;
  }
  @media only screen and (max-width: 900px) {
    width: 90%;
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
const Hr = styled.hr`
  display: block;
  width: 70%;
  float: left;
  border: none;
  height: 0.5px;
  display: block;
  /* Set the hr color */
  color: #47261b; /* old IE */
  background-color: #bd7d51; /* Modern Browsers */
`;
const DevPostPage = ({ posts }) => {
  const { id } = useParams();

  /**
   * For rendering custom image element inside the block
   * TODO: This might be useful later
   */
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
    if (!posts.postsLoaded) return <p>Loading...</p>;
    const post = posts.posts.find((post) => post.fields.slug === id).fields;
    /**
     * Get a list of headings on the page
     */
    const headings = markdownHeadings(post.body);
    const showHeadings = () => {
      return headings.map((heading) => {
        const level = (heading.match(/#/g) || []).length;

        let text = heading.replace(/#/g, "").trim();
        const P = styled.p`
          margin-left: ${7.5 * level}px;
          font-size: 12pt;
        `;
        return (
          <HashLink smooth to={`#${text.trim().replace(/\s/g, "-")}`}>
            <P>{text}</P>
          </HashLink>
        );
      });
    };
    const renderers = {
      code: ({ language, value }) => {
        const Pre = styled.pre`
          width: 100%;
          word-wrap: break-word;
        `;
        return (
          <Highlight
            {...defaultProps}
            code={value}
            language={language}
            theme={undefined}
            className={"wordwrap"}
          >
            {({ className, style, tokens, getLineProps, getTokenProps }) => (
              <pre className={className + " wordwrap"} style={style}>
                {tokens.map((line, i) => (
                  <div {...getLineProps({ line, key: i })}>
                    {line.map((token, key) => (
                      <span {...getTokenProps({ token, key })} />
                    ))}
                  </div>
                ))}
              </pre>
            )}
          </Highlight>
        );
      },
      heading: (value) => {
        switch (value.level) {
          case 1:
            return (
              <h1 id={value.node.children[0].value.replace(/\s/g, "-")}>
                {value.node.children[0].value}
              </h1>
            );
          case 2:
            return (
              <h2 id={value.node.children[0].value.replace(/\s/g, "-")}>
                {value.node.children[0].value}
              </h2>
            );

          case 3:
            return (
              <h3 id={value.node.children[0].value.replace(/\s/g, "-")}>
                {value.node.children[0].value}
              </h3>
            );

          case 4:
            return (
              <h4 id={value.node.children[0].value.replace(/\s/g, "-")}>
                {value.node.children[0].value}
              </h4>
            );

          case 5:
            return (
              <h5 id={value.node.children[0].value.replace(/\s/g, "-")}>
                {value.node.children[0].value}
              </h5>
            );

          case 6:
            return (
              <h6 id={value.node.children[0].value.replace(/\s/g, "-")}>
                {value.node.children[0].value}
              </h6>
            );

          default:
        }
      },
      image: (image) => {
        const Image = styled.img`
          width: 100%;
        `;
        const Caption = styled.figcaption`
          font-size: 12pt;
          text-align: center;
          font-style: italic;
        `;
        return (
          <figure>
            <Image src={image.src} />
            <Caption>{image.alt}</Caption>
          </figure>
        );
      },
      paragraph: (paragraph) => {
        const P = styled.p`
          width: 100%;
          word-wrap: break-word;
        `;
        return <P>{paragraph.children}</P>;
      },
    };

    function displayPostBody() {
      return (
        <ReactMarkdown
          renderers={renderers}
          plugins={[gfm]}
          children={post.body}
        ></ReactMarkdown>
      );
    }
    return (
      <>
        <MainHeader />
        <Side className={"headings"}>
          <small>{readableDate(post.date)}</small>
          <Hr />
          <p>Contents:</p>
          <span>{showHeadings()}</span>
        </Side>
        <Body>
          <Title> {post.title} </Title>
          <Date>{readableDate(post.date)}</Date>
          <Aside>{post.description}</Aside>
          <Image src={post.feature_image.fields.file.url}></Image>
          <Content>{displayPostBody()}</Content>
        </Body>
        <Side className={"headings"}>
          <LikeButton slug={post.slug} />
        </Side>
      </>
    );
  };
  return <div>{renderPost()}</div>;
};

const mapStateToProps = (state) => ({
  posts: getPosts(state),
});
export default connect(mapStateToProps)(DevPostPage);
