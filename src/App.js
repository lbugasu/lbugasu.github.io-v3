// import necessary packages
import React, { useEffect } from "react";
import { HashRouter as Router, Route } from "react-router-dom";
import { connect } from "react-redux";
import { loadPosts } from "./state/thunks";
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
} from "./pages";

import { Menu } from "./components";

const App = ({ posts, startLoadingPosts, generateTags }) => {
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
  });
  return (
    <Router>
      <Menu />
      <Route path="/" component={HomePage} exact />
      <Route path="/about" component={About} exact />
      <Route path="/tag/:subject" component={TagPage} />
      <Route path="/writing/:id" component={PostPage} />
      <Route path="/section/:section" component={SectionPage} />
      <Route path="/dev/:id" component={DevPostPage} />
      <Route path="/playground" component={Playground} exact />
    </Router>
  );
};
const mapStateToProps = (state) => ({
  posts: getPosts(state),
});
const mapDispatchToProps = (dispatch) => ({
  startLoadingPosts: () => dispatch(loadPosts()),
  generateTags: () => dispatch(getTags()),
});
export default connect(mapStateToProps, mapDispatchToProps)(App);
