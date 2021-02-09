// import necessary packages
import React, { useEffect } from "react";
import { HashRouter as Router, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import CookieConsent, { Cookies } from "react-cookie-consent";
import { loadPosts, loadPostsData } from "./state/thunks";
import { getTags } from "./state/actions";
import { getPosts, getMode } from "./state/selectors";

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
  ApprovalPage,
} from "./pages";

import { Menu, ScrollToTop } from "./components";

const App = ({
  posts,
  mode,
  startLoadingPosts,
  generateTags,
  getPostsLikes,
}) => {
  useEffect(() => {
    console.log("MMM: " + mode);
    if (!mode) {
      // ...let's toggle the .dark-theme class on the body
      document.body.classList.add("dark-mode");
      document.body.classList.remove("light-mode");

      // Otherwise, if the user's preference in localStorage is light...
    } else {
      // ...let's toggle the .light-theme class on the body
      document.body.classList.add("light-mode");
      document.body.classList.remove("dark-mode");
    }
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
      <CookieConsent
        location="bottom"
        buttonText="SURE THING!"
        flipButtons
        cookieName="Cookies on site"
        contentClasses="cookieContent"
        buttonWrapperClasses="cookieButtons"
        style={{
          backgroundColor: "var(--cookie-banner)",
          color: "var(--cookie-text)",
        }}
        contentStyle={{
          marginBottom: "0",
        }}
        buttonStyle={{
          color: "black",
          backgroundColor: "white",
          borderRadius: "5px",
        }}
        containerClasses="cookieBanner"
        buttonClasses="cookieBannerButton"
        expires={150}
      >
        I use cookies to <span className="italic"> improve </span>your
        experience! By continuing, you agree to the privacy policy. Learn more{" "}
        <Link to="/privacy-policy">
          <span className="emph">here</span>
        </Link>
      </CookieConsent>
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
      <Route path="/approvalpage" component={ApprovalPage} exact />
    </Router>
  );
};
const mapStateToProps = (state) => ({
  posts: getPosts(state),
  mode: getMode(state).mode,
});
const mapDispatchToProps = (dispatch) => ({
  startLoadingPosts: () => dispatch(loadPosts()),
  generateTags: () => dispatch(getTags()),
  getPostsLikes: () => dispatch(loadPostsData()),
});
export default connect(mapStateToProps, mapDispatchToProps)(App);
