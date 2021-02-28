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

export const getRandomImage = () => {
  return graphQLClient.query({
    query: gql`
      query {
        getRandomImage {
          url
        }
      }
    `,
  });
};
