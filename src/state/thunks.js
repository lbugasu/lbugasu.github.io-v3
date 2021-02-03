import {
  getFeatureImageInProgress,
  getFeatureImageSuccess,
  getFeatureImageFailure,
  postsLoadingInProgress,
  postsLoadingSuccess,
  postsLoadingFailure,
  loadingAllPostDataInProgress,
  loadingAllPostDataFailure,
  loadingAllPostDataSuccess,
  loadPostLikesInProgress,
  loadPostLikesSuccess,
  loadPostLikesFailure,
  sendPostLikeInProgress,
  sendPostLikeSuccess,
  sendPostLikeFailure,
  sendPostCommentInProgress,
  sendPostCommentSuccess,
  sendPostCommentFailure,
  loadPostCommentsInProgress,
  loadPostCommentsSuccess,
  loadPostCommentsFailure,
} from "./actions";

import { getAllPosts } from "../contentful";

// API endpoint
let endpoint = "http://ec2-3-19-54-69.us-east-2.compute.amazonaws.com";

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
        post.fields.feature_image.fields.file.url = url;
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

export const loadPostsData = () => (dispatch, getState) => {
  dispatch(loadingAllPostDataInProgress);
  try {
    let request = fetch(`${endpoint}/allpostdata `);
    dispatch(loadingAllPostDataSuccess(request.likes));
  } catch (error) {
    dispatch(loadingAllPostDataFailure);
  }
};
/**
 * Whenever a user sends a like to a post
 */
export const sendLike = (slug) => async (dispatch, getState) => {
  dispatch(sendPostLikeInProgress);
  try {
    const options = {
      method: "POST",
      body: JSON.stringify({
        slug: slug,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    };
    let request = await fetch(`${endpoint}/like`, options);
    if (request.saved === true) {
      dispatch(sendPostLikeSuccess);
    } else {
      dispatch(sendPostLikeFailure);
    }
  } catch (error) {
    dispatch(sendPostLikeFailure);
  }
};

/**
 * Whenever a user posts a comment to a post
 */
export const sendComment = (comment) => async (dispatch, getState) => {
  dispatch(sendPostCommentInProgress);
  try {
    const options = {
      method: "POST",
      body: JSON.stringify({
        slug: comment.slug,
        email: comment.email,
        name: comment.name,
        comment: comment,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    };
    let request = await fetch(`${endpoint}/comment`, options);
    if (request.saved === true) {
      dispatch(sendPostCommentSuccess);
    } else {
      dispatch(sendPostCommentFailure);
    }
  } catch (error) {
    dispatch(sendPostCommentFailure);
  }
};

/**
 * Get the likes of a post
 */
export const getLikes = (slug) => (dispatch, getState) => {
  dispatch(loadPostLikesInProgress);
  try {
    let request = fetch(`${endpoint}/likes/${slug}`);
    dispatch(loadPostLikesSuccess(request.likes));
  } catch (error) {
    dispatch(loadPostLikesFailure);
  }
};

/**
 * Get the comments of a post
 */
export const getComments = (slug) => async (dispatch, getState) => {
  dispatch(loadPostCommentsInProgress);
  try {
    let request = fetch(`${endpoint}/comments/${slug}`);
    dispatch(loadPostCommentsSuccess(request.comments));
  } catch (error) {
    dispatch(loadPostCommentsFailure);
  }
};
