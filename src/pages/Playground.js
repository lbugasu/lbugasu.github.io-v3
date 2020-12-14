import React, { useEffect } from "react";
import marked from "marked";
import ReactMarkdown from "react-markdown";

var markdown = require("markdown").markdown;
export default function Playground() {
  function placeContentHere() {
    return markdown.toHTML("Hello *World*!");
  }
  const file = require("../posts/first.txt");
  console.log(file);

  return (
    <div id="play">
      <h1>something</h1>
      {placeContentHere()}
    </div>
  );
}
