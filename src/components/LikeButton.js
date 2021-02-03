import React, { useEffect, useState } from "react";

import styled from "styled-components";

import { connect } from "react-redux";
import { getPosts } from "../state/selectors";
import { sendLike } from "../state/thunks";
const Button = styled.div`
  width: 90%;
  margin-top: 10%;
  padding: 10%;
  text-align: center;
`;
const Icon = styled.svg`
  width: 70px;
  display: inline-block;
`;
const LikeButton = ({ pressLike, posts, slug }) => {
  return (
    <Button>
      <Icon
        onClick={() => pressLike(slug)}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 375 375"
      >
        <defs>
          <clipPath id="like_svg__a">
            <path d="M52 11h270v340.75H52zm0 0" />
          </clipPath>
        </defs>
        <g clipPath="url(#like_svg__a)">
          <path
            d="M181.05 83.3c14.009-18.179 24.24-36.476 39.024-49.675 37.66-33.629 64.758-28.777 91.04 15.922 9.886 16.812 12.394 42.668 8.062 62.133a491.728 491.728 0 01-36.832 106.054c-21.828 45.215-45.215 90.207-79.875 133.993-14.344-10.774-29.621-17.555-37.918-29.282C127.8 270.5 89.336 219.168 67.395 158.598c-7.293-20.125-11-41.91-13.645-63.274-2.324-18.8-1.918-39.886 16.621-50.98 20.59-12.324 41.973-6.078 61.281 6.215 15.86 10.105 31.364 20.754 49.399 32.742"
            fill="#bd7d51"
          />
        </g>
      </Icon>
    </Button>
  );
};
const mapStateToProps = (state) => ({
  posts: getPosts(state),
});
const mapDispatchToProps = (dispatch) => ({
  pressLike: (slug) => dispatch(sendLike(slug)),
});
export default connect(mapStateToProps, mapDispatchToProps)(LikeButton);
