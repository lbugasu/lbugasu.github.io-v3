import React from "react";
import ReactMarkdown from "react-markdown";

import Highlight, { defaultProps } from "prism-react-renderer";
import gfm from "remark-gfm";
import styled from "styled-components";

const MarkDownBody = (body) => {
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
    link: (link) => {
      const InlineLink = styled.a`
        text-decoration: underline;
        text-decoration-color: var(--inline-link);
        :hover {
          text-decoration: underline;
          text-decoration-color: var(--inline-link);
        }
      `;
      let text = link.children[0].props.children;
      let url = link.href;

      return (
        <InlineLink href={url} rel="noreferrer" target={"_blank"}>
          {text}
        </InlineLink>
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
  return (
    <ReactMarkdown
      renderers={renderers}
      plugins={[gfm]}
      children={body.body}
    ></ReactMarkdown>
  );
};
export default MarkDownBody;
