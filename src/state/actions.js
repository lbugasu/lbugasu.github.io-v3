/**
 * Actions for getting the feature Image
 */
export const GET_FEATURE_IMAGE_IN_PROGRESS = "GET_FEATURE_IMAGE_IN_PROGRESS";
export const getFeatureImageInProgress = () => ({
  type: GET_FEATURE_IMAGE_IN_PROGRESS,
});
export const GET_FEATURE_IMAGE_SUCCESS = "GET_FEATURE_IMAGE_SUCCESS";
export const getFeatureImageSuccess = (link) => ({
  type: GET_FEATURE_IMAGE_SUCCESS,
  payload: { link },
});
export const GET_FEATURE_IMAGE_FAILURE = "GET_FEATURE_IMAGE_FAILURE";
export const getFeatureImageFailure = () => ({
  type: GET_FEATURE_IMAGE_FAILURE,
});

export const POSTS_LOADING_IN_PROGRESS = "POSTS_LOADING_IN_PROGRESS";
export const postsLoadingInProgress = () => ({
  type: POSTS_LOADING_IN_PROGRESS,
});
export const POSTS_LOADING_SUCCESS = "POSTS_LOADING_SUCCESS";
export const postsLoadingSuccess = (posts) => ({
  type: POSTS_LOADING_SUCCESS,
  payload: posts,
});
export const POSTS_LOADING_FAILURE = "POSTS_LOADING_FAILURE";
export const postsLoadingFailure = () => ({
  type: POSTS_LOADING_FAILURE,
});

export const GET_TAGS = "GET_TAGS";
export const getTags = () => ({
  type: GET_TAGS,
});

/**
 * Podcast Data - will call the api and return posts and the number of likes
 */

export const LOADING_ALL_POST_DATA_IN_PROGRESS =
  "LOADING_ALL_POST_DATA_IN_PROGRESS";
export const loadingAllPostDataInProgress = () => ({
  type: LOADING_ALL_POST_DATA_IN_PROGRESS,
});
export const LOADING_ALL_POST_DATA_SUCCESS = "LOADING_ALL_POST_DATA_SUCCESS";
export const loadingAllPostDataSuccess = (posts) => ({
  type: LOADING_ALL_POST_DATA_SUCCESS,
  payload: posts,
});
export const LOADING_ALL_POST_DATA_FAILURE = "LOADING_ALL_POST_DATA_FAILURE";
export const loadingAllPostDataFailure = () => ({
  type: LOADING_ALL_POST_DATA_FAILURE,
});

/**
 * Loading a post likes
 */
export const LOAD_POST_LIKES_IN_PROGRESS = "LOAD_POST_LIKES_IN_PROGRESS";
export const loadPostLikesInProgress = () => ({
  type: LOAD_POST_LIKES_IN_PROGRESS,
});
export const LOAD_POST_LIKES_SUCCESS = "LOAD_POST_LIKES_SUCCESS";
export const loadPostLikesSuccess = (posts) => ({
  type: LOAD_POST_LIKES_SUCCESS,
  payload: posts,
});
export const LOAD_POST_LIKES_FAILURE = "LOAD_POST_LIKES_FAILURE";
export const loadPostLikesFailure = () => ({
  type: LOAD_POST_LIKES_FAILURE,
});

/**
 * Send a like to a post
 */
export const SEND_POST_LIKE_IN_PROGRESS = "SEND_POST_LIKE_IN_PROGRESS";
export const sendPostLikeInProgress = () => ({
  type: SEND_POST_LIKE_IN_PROGRESS,
});
export const SEND_POST_LIKE_SUCCESS = "SEND_POST_LIKE_SUCCESS";
export const sendPostLikeSuccess = (likes) => ({
  type: SEND_POST_LIKE_SUCCESS,
  payload: likes,
});
export const SEND_POST_LIKE_FAILURE = "SEND_POST_LIKE_FAILURE";
export const sendPostLikeFailure = () => ({
  type: SEND_POST_LIKE_FAILURE,
});

/**
 * Send a comment to a post
 */
export const SEND_POST_COMMENT_IN_PROGRESS = "SEND_POST_COMMENT_IN_PROGRESS";
export const sendPostCommentInProgress = () => ({
  type: SEND_POST_COMMENT_IN_PROGRESS,
});
export const SEND_POST_COMMENT_SUCCESS = "SEND_POST_COMMENT_SUCCESS";
export const sendPostCommentSuccess = () => ({
  type: SEND_POST_COMMENT_SUCCESS,
});
export const SEND_POST_COMMENT_FAILURE = "SEND_POST_COMMENT_FAILURE";
export const sendPostCommentFailure = () => ({
  type: SEND_POST_COMMENT_FAILURE,
});
/**
 * Loading a podcast comments
 */
export const LOAD_POST_COMMENTS_IN_PROGRESS = "LOAD_POST_COMMENTS_IN_PROGRESS";
export const loadPostCommentsInProgress = () => ({
  type: LOAD_POST_COMMENTS_IN_PROGRESS,
});
export const LOAD_POST_COMMENTS_SUCCESS = "LOAD_POST_COMMENTS_SUCCESS";
export const loadPostCommentsSuccess = (posts) => ({
  type: LOAD_POST_COMMENTS_SUCCESS,
  payload: posts,
});
export const LOAD_POST_COMMENTS_FAILURE = "LOAD_POST_COMMENTS_FAILURE";
export const loadPostCommentsFailure = () => ({
  type: LOAD_POST_COMMENTS_FAILURE,
});
