import React from "react";
import { useParams } from "react-router-dom";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS } from "@contentful/rich-text-types";

import { useSingleExperiment } from "../custom-hooks";
import { readableDate } from "../components/helpers";
// import components
import MainHeader from "../components/MainHeader";
import ReactMarkdown from "react-markdown";

// Syntax higlighter highlights syntax for code blocks
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  dark,
  materialOceanic,
  synthwave84,
  materialLight,
  duotoneDark,
  duotoneEarth,
  duotoneForest,
  shadesOfPurple,
  duotoneLight,
  duotoneSea,
  duotoneSpace,
  nord,
  ghcolors,
  prism,
  okaidia,
  funky,
  coldarkDark,
  coldarkCold,
  vs,
  vscDarkPlus,
  pojoaque,
  tomorrow,
} from "react-syntax-highlighter/dist/esm/styles/prism/";
import {
  gradientDark,
  gradientLight,
  zenburn,
  ocean,
  dracula,
  xcode,
  tomorrowNightEighties,
  tomorrowNightBlue,
  atelierSulphurpoolLight,
  atomOneLight,
  vs2015,
} from "react-syntax-highlighter/dist/esm/styles/hljs/";
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
export default function PostPage() {
  const { id } = useParams();
  const [post, isLoading] = useSingleExperiment(id);
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
        return (
          <SyntaxHighlighter
            style={prism}
            wrapLongLines={true}
            language={language}
            children={value}
            contentEditable
            spellcheck="false"
          />
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
        <div className="singleDevPost">
          <br />
          <div
            className="devDescription"
            style={{
              backgroundImage: `url(${post.featureImage.fields.file.url})`,
            }}
          >
            <h1>{post.title}</h1>
            <small>{readableDate(post.date)}</small>
          </div>

          <div className="devBody">{printStuff()}</div>
        </div>
      </>
    );
  };
  return <div>{renderPost()}</div>;
}
