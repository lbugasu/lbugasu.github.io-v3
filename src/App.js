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
import About from "./pages/About.js";
import HomePage from "./pages/HomePage";
import WritingSectionPage from "./pages/WritingSectionPage";
import TagPage from "./pages/TagPage";
import Blog from "./pages/Blog";
import PostPage from "./pages/PostPage";
import DevPostPage from "./pages/DevPostPage";
import Dev from "./pages/Dev";
import Playground from "./pages/Playground";

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
      <Route path="/" component={HomePage} exact />
      <Route path="/about" component={About} exact />
      <Route path="/tag/:subject" component={TagPage} />
      <Route path="/writing/:id" component={PostPage} />
      <Route path="/blog" component={Blog} exact />

      <Route path="/writing-section/:section" component={WritingSectionPage} />
      <Route path="/dev" component={Dev} exact />
      <Route path="/playground" component={Playground} exact />

      <Route path="/dev/:id" component={DevPostPage} />
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
