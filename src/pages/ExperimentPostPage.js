import React from "react";
import { useParams } from "react-router-dom";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS } from "@contentful/rich-text-types";

import { useSingleExperiment } from "../custom-hooks";
import { readableDate } from "../components/helpers";
import MainHeader from "../components/MainHeader";
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";

const { richTextFromMarkdown } = require("@contentful/rich-text-from-markdown");
// If you're in the browser, the Remarkable class is already available in the window
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

    async function convertToMd() {
      let richtxt = richTextFromMarkdown(post.js);
      richtxt.then((r) => {
        console.log(r);
        return documentToHtmlString(r);
      });
    }
    convertToMd();
    function printStuff() {
      let text = convertToMd().then((txt) => {
        return txt;
      });
      console.log(text);
      text = `${text}`;
      return <div>{`${text}`}</div>;
    }
    // console.log(post.body);
    return (
      <>
        <MainHeader />
        <div style={{ padding: "5% 10% 5% 10%" }} className="experimentPost">
          <br />
          <div
            style={{
              height: "50vh",
              backgroundSize: "40%",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right",
              backgroundImage: `url(${post.featureImage.fields.file.url})`,
            }}
          >
            <h1 style={{ fontSize: "500%" }}>{post.title}</h1>
            <small>{readableDate(post.date)}</small>
          </div>

          <div style={{ padding: "7.5%" }} className="expBody">
            {documentToReactComponents(post.body, options)}
          </div>
          {printStuff()}
        </div>
      </>
    );
  };
  return <div className="post">{renderPost()}</div>;
}
