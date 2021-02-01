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
