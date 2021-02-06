// import necessary packages
import React, { useEffect } from "react";
import { HashRouter as Router, Route } from "react-router-dom";
import { connect } from "react-redux";
import { loadPosts, loadPostsData } from "./state/thunks";
import { getTags } from "./state/actions";
import { getPosts } from "./state/selectors";

//import css
import "./css/main.css";
import "./css/palette.css";
import "./css/CodeBlock.css";

// import components
import {
  About,
  DevPostPage,
  HomePage,
  Playground,
  PostPage,
  SectionPage,
  TagPage,
  RssFeed,
  Vault,
} from "./pages";

import { Menu, ScrollToTop } from "./components";

const App = ({ posts, startLoadingPosts, generateTags, getPostsLikes }) => {
  useEffect(() => {
    /**
     * If the posts have been loaded, don't load the posts again
     */

    if (!posts.postsLoaded) {
      startLoadingPosts();
    }
    if (posts.posts.postsLoaded) {
      generateTags();
    }

    if (posts.postsLoaded && !posts.postsDataLoaded) {
      getPostsLikes();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [posts.posts.postsLoaded, posts.postsLoaded]);
  return (
    <Router>
      <Menu />
      <Route path="/" component={HomePage} exact />
      <Route path="/about" component={About} exact />
      <Route path="/vault" component={Vault} exact />
      <Route path="/tag/:subject" component={TagPage} />
      <Route path="/writing/:id" component={PostPage} />
      <Route path="/section/:section" component={SectionPage} />
      <Route path="/dev/:id" component={DevPostPage} />
      <Route path="/playground" component={Playground} exact />
      <Route path="/rss" component={RssFeed} exact />
    </Router>
  );
};
const mapStateToProps = (state) => ({
  posts: getPosts(state),
});
const mapDispatchToProps = (dispatch) => ({
  startLoadingPosts: () => dispatch(loadPosts()),
  generateTags: () => dispatch(getTags()),
  getPostsLikes: () => dispatch(loadPostsData()),
});
export default connect(mapStateToProps, mapDispatchToProps)(App);
