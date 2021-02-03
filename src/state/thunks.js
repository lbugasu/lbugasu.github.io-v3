import {
  getFeatureImageInProgress,
  getFeatureImageSuccess,
  getFeatureImageFailure,
  postsLoadingInProgress,
  postsLoadingSuccess,
  postsLoadingFailure,
} from "./actions";

import { getAllPosts } from "../contentful";

export const loadFeatureImage = () => (dispatch, getState) => {
  dispatch(getFeatureImageInProgress());
  try {
    const image = fetch(
      "https://lbugasu-cors-proxy.herokuapp.com/http://ec2-3-19-54-69.us-east-2.compute.amazonaws.com/randomImage",
      {
        method: "GET",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
      }
    );
    image.then((response) => {
      response.json().then((result) => {
        dispatch(getFeatureImageSuccess(result.link));
      });
    });
  } catch (error) {
    dispatch(getFeatureImageFailure());
  }
};
/**
 * Get a list of posts from the contentful CMS
 */
export const loadPosts = () => (dispatch, getState) => {
  dispatch(postsLoadingInProgress());
  // load all the blog posts from contentful

  try {
    getAllPosts().then((result) => {
      const posts = result.sort(function (a, b) {
        return new Date(b.fields.date) - new Date(a.fields.date);
      });
      posts.map((post) => {
        const url = post.fields.feature_image.fields.file.url;
        post.fields.feature_image.fields.file.url = "https://" + url;
      });
      dispatch(postsLoadingSuccess(posts));
    });
  } catch (error) {
    /**
     * Why would there be an error? if posts don't load.
     * TODO: check how errors can occur
     */
    console.log(error.message);
    dispatch(postsLoadingFailure());
  }
};

/**
 * Whenever a user sends a like to a post
 */
export const sendLike = () => (dispatch, getState) => {};

/**
 * Whenever a user posts a comment to a post
 */
export const sendComment = () => (dispatch, getState) => {};

/**
 * Get the likes of a post
 */
export const getLikes = () => (dispatch, getState) => {};

/**
 * Get the comments of a post
 */
export const getComments = () => (dispatch, getState) => {};
