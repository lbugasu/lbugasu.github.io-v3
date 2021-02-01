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
