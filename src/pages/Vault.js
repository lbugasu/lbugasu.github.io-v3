import React from "react";

import { connect } from "react-redux";
import { MainHeader, Footer } from "../components";
const Vault = () => {
  return (
    <div>
      <MainHeader />
      <Footer />
    </div>
  );
};

const mapStateToProps = (state) => ({});
const mapDispatchToProps = (dispatch) => ({});
export default connect(mapStateToProps, mapDispatchToProps)(Vault);
