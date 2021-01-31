import {
  GET_FEATURE_IMAGE_FAILURE,
  GET_FEATURE_IMAGE_IN_PROGRESS,
  GET_FEATURE_IMAGE_SUCCESS,
} from "./actions";

const initialState = {
  featuredImage: "",
  featuredImageLoaded: false,
  featuredImageLoading: false,
};

export const featuredImage = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_FEATURE_IMAGE_IN_PROGRESS:
      return {
        ...state,
        featuredImageLoading: true,
      };
    case GET_FEATURE_IMAGE_SUCCESS:
      const link = payload.link;
      return {
        ...state,
        featuredImageLoading: false,
        featuredImageLoaded: true,
        featuredImage: link,
      };
    case GET_FEATURE_IMAGE_FAILURE:
      return {
        ...state,
        featuredImageLoading: false,
        featuredImageLoaded: false,
      };
    default:
      return { ...state };
  }
};
