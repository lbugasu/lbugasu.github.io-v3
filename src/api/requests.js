import {
  ApolloClient,
  InMemoryCache,
  gql,
  ApolloLink,
  HttpLink,
} from "@apollo/client";
import endpoints from "./endpoint.json";

// Require axios to perform easy promise-based POST request
const axios = require("axios");
// Define constant
// Endpoint URL
const githubUrl = "https://api.github.com/graphql";
// Your personal access token
const token = "1d4bf08cc8f913da64e0ee5b59539c3ec1090a9f";
// The Authorization in the header of the request
const oauth = { Authorization: "bearer " + token };
const query = `
           {
             repository(owner: "lbugasu", name: "articles") {
               defaultBranchRef {
                 target {
                   ... on Commit {
                     file(path: "/") {
                       type
                       object {
                         ... on Tree {
                           entries {
                             name
                             object {
                               ... on Blob {
                                 text
                               }
                             }
                           }
                         }
                       }
                     }
                   }
                 }
               }
             }
           }
         `;

let endpoint;
if (process.env.REACT_APP_WHAT === "development") endpoint = endpoints.dev;
else if (process.env.REACT_APP_WHAT === "production") endpoint = endpoints.prod;

export const graphQLClient = new ApolloClient({
  uri: endpoint,
  cache: new InMemoryCache({
    addTypename: false,
  }),
});

export const getSnacks = () => {
  return axios.post(githubUrl, { query: query }, { headers: oauth });
};
export const getRandomImage = async () => {
  let request = await graphQLClient.query({
    query: gql`
      query {
        getRandomImage {
          url
        }
      }
    `,
  });
  let data = request.data.getRandomImage;
  return data;
};

export const getBlogPosts = async () => {
  let request = await graphQLClient.query({
    query: gql`
      query {
        getBlogPosts {
          title
          tags
          section
          body
          likeLevel
          type
          date
          featuredImage
          description
          slug
        }
      }
    `,
  });
  let posts = request.data.getBlogPosts;

  return posts;
};

export const postLike = async (slug) => {
  let request = await graphQLClient.mutate({
    mutation: gql`
      mutation postLike($slug: String!) {
        postLike(slug: $slug)
      }
    `,
    variables: { slug: slug },
  });
  let likes = request.data.postLike;
  return likes;
};

export const getPostLikes = async (slug) => {
  let request = await graphQLClient.query({
    query: gql`
      query getLikes($slug: String!) {
        getLikes(slug: $slug)
      }
    `,
    variables: { slug: slug },
  });
  return request.data.getLikes;
};

export const postComment = async (comment) => {
  console.log(comment);
  let request;

  try {
    request = await graphQLClient.mutate({
      mutation: gql`
        mutation createComment($data: CommentInput!) {
          createComment(data: $data) {
            content
          }
        }
      `,
      variables: { data: comment },
    });
  } catch (error) {
    console.log(error.message);
  }
  return request;
};

export const getPostComments = async (slug) => {
  let request = await graphQLClient.query({
    query: gql`
      query getComments($slug: String!) {
        getComments(slug: $slug) {
          content
          approved
          user {
            name
          }
          createdAt
        }
      }
    `,
    variables: { slug: slug },
  });
  return request.data.getComments;
};
