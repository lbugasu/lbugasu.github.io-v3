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
      "https://lbugasu-cors-proxy.herokuapp.com/https://laudebugs-api.herokuapp.com/randomImage",
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
export const loadPosts = () => (dispatch, getState) => {
  dispatch(postsLoadingInProgress());
  // load all the blog posts from contentful

  try {
    getAllPosts().then((result) => {
      const posts = result.sort(function (a, b) {
        return new Date(b.fields.date) - new Date(a.fields.date);
      });
      console.log(posts);
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
