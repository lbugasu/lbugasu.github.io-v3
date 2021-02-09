import { DateTime } from "luxon";

import {
  GET_FEATURE_IMAGE_FAILURE,
  GET_FEATURE_IMAGE_IN_PROGRESS,
  GET_FEATURE_IMAGE_SUCCESS,
  GET_IMAGE_FAILURE,
  GET_IMAGE_IN_PROGRESS,
  GET_IMAGE_SUCCESS,
  POSTS_LOADING_IN_PROGRESS,
  POSTS_LOADING_SUCCESS,
  POSTS_LOADING_FAILURE,
  GET_TAGS,
  LOADING_ALL_POST_DATA_IN_PROGRESS,
  LOADING_ALL_POST_DATA_SUCCESS,
  LOADING_ALL_POST_DATA_FAILURE,
  LOAD_POST_LIKES_IN_PROGRESS,
  LOAD_POST_LIKES_SUCCESS,
  LOAD_POST_LIKES_FAILURE,
  SEND_POST_COMMENT_IN_PROGRESS,
  SEND_POST_COMMENT_SUCCESS,
  SEND_POST_COMMENT_FAILURE,
  SEND_POST_LIKE_IN_PROGRESS,
  SEND_POST_LIKE_SUCCESS,
  SEND_POST_LIKE_FAILURE,
  LOAD_POST_COMMENTS_IN_PROGRESS,
  LOAD_POST_COMMENTS_SUCCESS,
  LOAD_POST_COMMENTS_FAILURE,
  SWITCHMODE,
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
  commentLoading: false,
  commentsLoaded: false,
  postsDataLoading: false,
  postsDataLoaded: false,
  postCommentsLoading: false,
  postLikesLoading: false,
  likeInProgress: false,
  mode:
    DateTime.local() > DateTime.local().set({ hour: 6, minute: 0 }) &&
    DateTime.local() < DateTime.local().set({ hour: 18, minute: 0 }),
  commentSuccess: false,
};

export const mode = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case SWITCHMODE:
      return {
        ...state,
        mode: !state.mode,
      };
    default:
      return state;
  }
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
        post.likeLevel = 0;
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
    case GET_IMAGE_IN_PROGRESS:
      let targetSlug = payload;
      let targetIndex = state.posts.find((p) => p.fields.slug === targetSlug);
      let cachedPost = state.posts[targetIndex];
      cachedPost.imageLoading = true;
      cachedPost.imageLoaded = false;
      let tempCache = [...state.posts];
      tempCache[targetIndex] = cachedPost;
      return {
        ...state,
        posts: tempCache,
      };
    case GET_IMAGE_SUCCESS:
      targetSlug = payload.slug;
      let targetImage = payload.image;
      targetIndex = state.posts.find((p) => p.fields.slug === targetSlug);
      cachedPost = state.posts[targetIndex];
      cachedPost.imageLoading = false;
      cachedPost.imageLoaded = true;
      cachedPost.fields.feature_image.fields.file.url = targetImage;
      tempCache = [...state.posts];
      tempCache[targetIndex] = cachedPost;
      return {
        ...state,
        posts: tempCache,
      };
    case GET_IMAGE_FAILURE:
      targetSlug = payload;
      targetIndex = state.posts.find((p) => p.fields.slug === targetSlug);
      cachedPost = state.posts[targetIndex];
      cachedPost.imageLoading = false;
      cachedPost.imageLoaded = true;
      tempCache = [...state.posts];
      tempCache[targetIndex] = cachedPost;
      return {
        ...state,
        posts: tempCache,
      };
    case LOADING_ALL_POST_DATA_IN_PROGRESS:
      return {
        ...state,
        postsDataLoading: false,
      };
    // will load all the likes
    case LOADING_ALL_POST_DATA_SUCCESS:
      const data = payload.data;
      /**
       * map all the likes to each podcast
       * the podcasts returned will only contain
       * podcasts in the database
       */
      console.log(data);
      let tempPosts = [...state.posts];
      data.map((post) => {
        let thisPostIndex = tempPosts.findIndex(
          (p) => p.fields.slug === post.slug
        );
        if (thisPostIndex >= 0) {
          tempPosts[thisPostIndex] = {
            ...tempPosts[thisPostIndex],
            likes: post.likes,
            likesLoaded: true,
          };
        }
      });
      return {
        ...state,
        posts: tempPosts,
        postsDataLoading: false,
        postsDataLoaded: true,
      };

    case LOADING_ALL_POST_DATA_FAILURE:
      return {
        ...state,
        postsDataLoading: false,
        postsDataLoaded: false,
      };
    case LOAD_POST_LIKES_IN_PROGRESS:
      return {
        ...state,
        postLikesLoading: true,
      };
    case LOAD_POST_LIKES_SUCCESS:
      const postData = payload;
      const postIndex = state.posts.findIndex(
        (post) => post.fields.slug === postData.slug
      );
      const thisPost = state.posts[postIndex];
      thisPost.likes = postData.likes;
      thisPost.likesLoaded = true;
      const tempPostsData = [...state.posts];
      tempPostsData[postIndex] = thisPost;

      return {
        ...state,
        posts: tempPostsData,
        postLikesLoading: false,
      };
    case LOAD_POST_LIKES_FAILURE:
      return {
        ...state,
        postLikesLoading: false,
      };

    // COMMENTING
    case SEND_POST_COMMENT_IN_PROGRESS:
      return {
        ...state,
        commentInProgress: true,
      };
    case SEND_POST_COMMENT_SUCCESS:
      return {
        ...state,
        commentInProgress: false,
        commentSuccess: true,
      };
    case SEND_POST_COMMENT_FAILURE:
      return {
        ...state,
        commentInProgress: false,
        commentSuccess: false,
      };
    case SEND_POST_LIKE_IN_PROGRESS:
      return { ...state, likeInProgress: true };
    case SEND_POST_LIKE_SUCCESS:
      const likedObject = payload;
      const thisIndx = state.posts.findIndex(
        (obj) => obj.fields.slug === likedObject.slug
      );
      console.log(thisIndx);
      const tempPostList = [...state.posts];
      const thisOne = state.posts[thisIndx];
      thisOne.likes = likedObject.likes;
      thisOne.likeLevel += 1;
      tempPostList[thisIndx] = thisOne;

      console.log(tempPostList[thisIndx]);
      return {
        ...state,
        posts: tempPostList,
        likeInProgress: false,
        likeSuccess: true,
      };
    case SEND_POST_LIKE_FAILURE:
      return {
        ...state,
        likeInProgress: false,
        likeSuccess: false,
      };

    case LOAD_POST_COMMENTS_IN_PROGRESS:
      return {
        ...state,
        commentsLoading: true,
      };
    case LOAD_POST_COMMENTS_SUCCESS:
      const postCommentData = payload;
      console.log("0x0");
      console.log(postCommentData);

      const postIndx = state.posts.findIndex(
        (post) => post.fields.slug === postCommentData.slug
      );
      const currPost = state.posts[postIndx];
      currPost.comments = postCommentData.comments;
      currPost.commentsLoaded = true;
      const tempPostData = [...state.posts];
      tempPostData[postIndx] = currPost;

      return {
        ...state,
        posts: tempPostData,
        commentsLoading: false,
        commentsLoaded: true,
      };
    case LOAD_POST_COMMENTS_FAILURE:
      return {
        ...state,
        commentsLoading: false,
        commentsLoaded: false,
      };
    default:
      return state;
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
      return state;
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
      return state;
  }
};
