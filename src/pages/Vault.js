import React from "react";

import { connect } from "react-redux";
import { MainHeader, Footer, Loading } from "../components";
import { getPosts } from "../state/selectors";

const Vault = ({ posts }) => {
  const renderPosts = () => {
    if (posts.postsLoading) {
      return <Loading />;
    } else {
      return <div></div>;
    }
  };
  return (
    <div>
      <MainHeader />
      {renderPosts()}
      <Footer />
    </div>
  );
};

const mapStateToProps = (state) => ({
  posts: getPosts(state),
});
const mapDispatchToProps = (dispatch) => ({});
export default connect(mapStateToProps, mapDispatchToProps)(Vault);
