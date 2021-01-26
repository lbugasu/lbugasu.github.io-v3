// import necessary packages
import React, { Component } from "react";
import { HashRouter as Router, Route } from "react-router-dom";

//import css
import "./css/main.css";

// import components
import About from "./pages/About.js";
import HomePage from "./pages/HomePage";
import WritingSectionPage from "./pages/WritingSectionPage";
import WritingSubjectPage from "./pages/WritingSubjectPage";
import Blog from "./pages/Blog";
import PostPage from "./pages/PostPage";
import DevPostPage from "./pages/DevPostPage";
import Dev from "./pages/Dev";
import Playground from "./pages/Playground";
import RollingPoem from './components/RollingPoem'
class App extends Component {
  render() {
    return (
      <Router>
        <RollingPoem/>
        <div>here?</div>
        <Route path="/" component={HomePage} exact />
        <Route path="/about" component={About} exact />
        <Route
          path="/writing-subjects/:subject"
          component={WritingSubjectPage}
        />
        <Route path="/writing/:id" component={PostPage} />
        <Route path="/blog" component={Blog} exact />

        <Route
          path="/writing-section/:section"
          component={WritingSectionPage}
        />
        <Route path="/dev" component={Dev} exact />
        <Route path="/playground" component={Playground} exact />

        <Route path="/dev/:id" component={DevPostPage} />
      </Router>
    );
  }
}
export default App;
