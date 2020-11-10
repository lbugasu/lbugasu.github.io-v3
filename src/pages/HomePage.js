import React from "react";

import { useFeed } from "../custom-hooks/";

//import components
import Header from "../components/Header";
import About from "../components/About";
import Work from "../components/Work";
import Misc from "../components/Misc";

export default function HomePage() {
  const [posts, isLoading] = useFeed();

  const showPosts = () => {
    // Perhaps add animation to homepage when laoding
    if (isLoading) return <p>Loading</p>;
    // Render only the first three posts
    return posts.slice(0, 3).map((post) => (
      <div className="singlePost">
        <h4>{post.title}</h4>
        <h5>{post.pubDate.substring(0, 16)}</h5>
        <p>
          <a href={post.link}>Read➚</a>
        </p>
      </div>
    ));
  };
  // Render the homepage
  return (
    <div>
      <Header />
      <About />
      <div id="writing" className="posts">
        <h3>Recent Articles:</h3>
        {showPosts()}
      </div>
      <Work />
      <Misc />
    </div>
  );
}
