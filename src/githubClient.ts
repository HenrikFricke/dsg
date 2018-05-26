import "cross-fetch/polyfill";

import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";

import gql from "graphql-tag";

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    headers: {
      Authorization: process.env.GITHUB_TOKEN
    },
    uri: "https://api.github.com/graphql"
  })
});

export const FETCH_REPOSITORIES = gql`
  {
    user(login: "HenrikFricke") {
      repositories(
        first: 10
        privacy: PUBLIC
        isFork: false
        orderBy: { field: CREATED_AT, direction: DESC }
      ) {
        nodes {
          name
        }
      }
    }
  }
`;
