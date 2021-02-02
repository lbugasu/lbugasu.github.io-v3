import {
  GET_FEATURE_IMAGE_FAILURE,
  GET_FEATURE_IMAGE_IN_PROGRESS,
  GET_FEATURE_IMAGE_SUCCESS,
  POSTS_LOADING_IN_PROGRESS,
  POSTS_LOADING_SUCCESS,
  POSTS_LOADING_FAILURE,
  GET_TAGS,
} from "./actions";
const Funcs = require("../components/helpers");
const initialState = {
  featuredImage: "",
  featuredImageLoaded: false,
  featuredImageLoading: false,
  posts: [],
  postsLoaded: false,
  postsLoading: false,
  tags: [],
};

export const posts = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case POSTS_LOADING_IN_PROGRESS:
      return {
        ...state,
        postsLoading: true,
      };
    case POSTS_LOADING_SUCCESS:
      const posts = payload;
      let colors = [
        "--flirt",
        "--cerulean-blue",
        "--xanadu",
        "--unbleached-silk",
        "--saffron",
        "--windsor-tan",
        "--orange-pantone",
        "--manatee",
        "--maize-crayola",
        "--mint-green",
        "--flame",
        "--marigold",
        "--spring-green",
        "--pacific-blue",
        "--artichoke",
        "--dark-sky-blue",
        "--emerald",
        "--mandarin",
        "--skobeloff",
        "--rhythm",
        "--aquamarine",
        "--light-sky-blue",
        "--aero",
        "--tea-green",
        "--inchworm",
        "--banana-mania",
        "--minion-yellow",
        "--cadet-blue",
        "--unbleached-silk",
        "--tea-green",
        "--old-lavender",
        "--pearly-purple",
        "--cedar-chest",
        "--china-pink",
        "--maximum-blue",
        "--vivid-sky-blue",
        "--plum:",
      ];
      Funcs.shuffleArray(colors);
      let tagsList = [];
      posts.map((post) => {
        let postTags = post.fields.tags;
        postTags.map((tag) => {
          let currentTag = tagsList.find((tagObj) => tagObj.tag === tag);
          if (!!currentTag) {
            currentTag.count += 1;
          } else {
            tagsList.push({ tag: tag, count: 1 });
          }
        });
      });
      tagsList.map((tag, i) => {
        tag.color = colors[i % colors.length];
      });
      return {
        ...state,
        posts: posts,
        tags: tagsList,
        postsLoaded: true,
        postsLoading: false,
      };
    case POSTS_LOADING_FAILURE:
      return {
        ...state,
        postsLoaded: false,
        postsLoading: false,
      };
    default:
      return { ...state };
  }
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

export const tags = (state = initialState, action) => {
  const { type } = action;
  switch (type) {
    case GET_TAGS:
      const posts = state.posts.posts;
      console.log(posts);
      posts.map((post) => {
        console.log(post);
      });
      return {
        ...state,
        tags: {},
      };
    default:
      return { ...state };
  }
};
