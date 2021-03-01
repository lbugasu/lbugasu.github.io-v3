import {
  getFeatureImageInProgress,
  getFeatureImageSuccess,
  getFeatureImageFailure,
  getImageInProgress,
  getImageSuccess,
  getImageFailure,
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
import {
  getRandomImage,
  getBlogPosts,
  postLike,
  getPostLikes,
  postComment,
  getPostComments,
} from "../api/requests";

// API endpoint
let prod = "https://laudebugs.tamaduni.org";
let dev = "http://localhost:4000";
let endpoint = prod;

export const loadFeatureImage = () => (dispatch, getState) => {
  dispatch(getFeatureImageInProgress());
  try {
    const image = getRandomImage();
    image.then((result) => {
      dispatch(getFeatureImageSuccess(result.url));
    });
  } catch (error) {
    dispatch(getFeatureImageFailure());
  }
};
export const loadImage = (slug, url) => async (dispatch, getState) => {
  dispatch(getImageInProgress(slug));
  try {
    const result = await fetch(`${endpoint}/photo?link=https:${url}`);
    const imageData = await result.json();
    var base64Flag = "data:image/jpeg;base64,";

    let resultingImate = base64Flag + imageData.image;
    dispatch(getImageSuccess({ slug: slug, image: resultingImate }));
  } catch (error) {
    dispatch(getImageFailure());
  }
};
/**
 * Get a list of posts from the contentful CMS
 */
export const loadPosts = () => (dispatch, getState) => {
  dispatch(postsLoadingInProgress());
  // load all the blog posts from contentful

  try {
    const request = getBlogPosts();
    request.then((data) => {
      let blogPosts = data.map((post) => {
        return { ...post };
      });
      dispatch(postsLoadingSuccess(blogPosts));
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
    let request = postLike(slug);
    console.log(request);
    request.then((result) => {
      dispatch(sendPostLikeSuccess({ slug: slug, likes: result }));
    });
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
    let request = postComment(comment);
    request.then(() => {
      dispatch(sendPostCommentSuccess);
    });
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
    let request = getPostLikes(slug);
    request.then((response) => {
      dispatch(loadPostLikesSuccess(response));
    });
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
    const request = getPostComments(slug);
    console.log(slug);
    request.then((comments) => {
      console.log(comments);
      dispatch(loadPostCommentsSuccess({ slug: slug, comments: comments }));
    });
  } catch (error) {
    console.log(error.message);
    dispatch(loadPostCommentsFailure);
  }
};
