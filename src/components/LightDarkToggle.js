import React, { useState, useEffect } from "react";

import styled from "styled-components";
import { connect } from "react-redux";
import { getMode } from "../state/selectors";
import { toggleMode } from "../state/actions";

const LightToggle = styled.span`
  font-size: 65%;
  padding: 2%;
  height: 100%;
  vertical-align: middle;
  opacity: 0.7;
  :hover {
    cursor: pointer;
  }
`;
const LightDarkToggle = ({ mode, toggle }) => {
  return (
    <LightToggle className="btn-toggle" onClick={() => toggle()}>
      {mode === "dark" ? <>🌑</> : <>🌕</>}
    </LightToggle>
  );
};

const mapStateToProps = (state) => ({
  mode: getMode(state),
});
const mapDispatchToProps = (dispatch) => ({
  toggle: () => dispatch(toggleMode()),
});
export default connect(mapStateToProps, mapDispatchToProps)(LightDarkToggle);
