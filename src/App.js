// import necessary packages
import React, { Component } from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";

//import css
import "./css/main.css";

// import components
import HomePage from "./pages/HomePage.js";

class App extends Component {
  render() {
    return (
      <Router>
        <Route path="/" component={HomePage} exact />
      </Router>
    );
  }
}
export default App;
