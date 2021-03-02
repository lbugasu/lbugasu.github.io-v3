import React from "react";

import styled from "styled-components";
import { connect } from "react-redux";
import { getMode } from "../state/selectors";
import { switchMode } from "../state/actions";

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
  function toggleMode() {
    // Change the mode
    toggle();

    // If the user's OS setting is dark and matches our .dark-mode class...

    if (mode) {
      // ...let's toggle the .dark-theme class on the body
      document.body.classList.toggle("dark-mode");
      document.body.classList.toggle("light-mode");

      // Otherwise, if the user's preference in localStorage is light...
    } else {
      // ...let's toggle the .light-theme class on the body
      document.body.classList.toggle("light-mode");
      document.body.classList.toggle("dark-mode");
    }
  }
  return (
    <LightToggle className="btn-toggle" onClick={() => toggleMode()}>
      {mode ? <>🌑</> : <>🌕</>}
    </LightToggle>
  );
};

const mapStateToProps = (state) => ({
  mode: getMode(state).mode,
});
const mapDispatchToProps = (dispatch) => ({
  toggle: () => dispatch(switchMode()),
});
export default connect(mapStateToProps, mapDispatchToProps)(LightDarkToggle);
