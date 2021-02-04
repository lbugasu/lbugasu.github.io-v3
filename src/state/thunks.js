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
let endpoint = "http://localhost:4000";
let amzn = "http://ec2-3-19-54-69.us-east-2.compute.amazonaws.com";

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
    getAllPosts().then(async (result) => {
      const posts = result.sort(function (a, b) {
        return new Date(b.fields.date) - new Date(a.fields.date);
      });
      /**
       * To ensure that the browser doesn't block my images,
       * I call the api that converts the images to base64 and the
       * browser then just simply reads the data
       */
      await Promise.all(
        posts.map(async (post) => {
          const url = post.fields.feature_image.fields.file.url;
          const result = await fetch(
            `http://localhost:4000/photo?link=https:${url}`
          );
          const imageData = await result.json();
          var base64Flag = "data:image/jpeg;base64,";

          post.fields.feature_image.fields.file.url =
            base64Flag + imageData.image;
        })
      ).then(() => dispatch(postsLoadingSuccess(posts)));
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

export const loadPostsData = () => async (dispatch, getState) => {
  dispatch(loadingAllPostDataInProgress);
  try {
    let request = await fetch(`${endpoint}/allpostdata `);
    let data = await request.json();
    dispatch(loadingAllPostDataSuccess(data));
  } catch (error) {
    console.log(error.message);
    dispatch(loadingAllPostDataFailure);
  }
};
/**
 * Whenever a user sends a like to a post
 */
export const sendLike = (slug) => async (dispatch, getState) => {
  console.log(slug);
  dispatch(sendPostLikeInProgress());
  try {
    const options = {
      method: "POST",
      body: JSON.stringify({
        slug: slug,
      }),
      "Access-Control-Allow-Origin": "*",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    };
    let request = await fetch(`${endpoint}/like`, options);
    console.log(request);
    let result = await request.json();
    result.slug = slug;

    dispatch(sendPostLikeSuccess(result));
  } catch (error) {
    console.log(error.message);
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
      body: JSON.stringify(comment),
      headers: {
        "Content-Type": "application/json",
      },
    };
    let sendRequest = await fetch(`${endpoint}/comment`, options);
    let request = await sendRequest.json();
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
    let request = await fetch(`${endpoint}/comments?slug=${slug}`);
    let comments = await request.json();
    console.log(comments);
    dispatch(loadPostCommentsSuccess(comments));
  } catch (error) {
    console.log(error.message);
    dispatch(loadPostCommentsFailure);
  }
};
