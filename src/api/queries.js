import axios from "axios";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

let prod = "https://laudebugs.tamaduni.org/graphql/";
let dev = "http://localhost:8080/graphql/";
let endpoint;

if (process.env.NODE_ENV === "development") endpoint = dev;
else endpoint = prod;

export const graphQLClient = new ApolloClient({
  uri: endpoint + "/graphql/",
  cache: new InMemoryCache({
    addTypename: false,
  }),
});

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
        }
      }
    `,
  });
  let posts = request.data.getBlogPosts;
  return posts;
};

export const postLike = async (slug) => {
  let request = await graphQLClient.mutation({
    mutation: gql`
            postLike(slug:${slug})
        `,
  });
  let likes = request.data.postLike;
  return likes;
};

export const getPostLikes = async (slug) => {
  let request = await graphQLClient.query({
    query: gql`
            getLikes(${slug})    
        `,
  });
  return request.data.getLikes;
};

export const postComment = async (comment) => {
  let request = await graphQLClient.mutation({
    mutation: gql`
            createComment(data:${comment}){
                content
            }
        `,
  });
  return request.data.createComment.content;
};

export const getComments = async (slug) => {
  let request = await graphQLClient.query({
    query: gql`
            getComments(${slug}){
                content
                approved
                user {
                    name
                }
            }
        `,
  });
  return request.data.getComments;
};
