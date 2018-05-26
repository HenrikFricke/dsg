import "cross-fetch/polyfill";

import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";

import gql from "graphql-tag";

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: `${process.env.DSG_BASE_URL}/graphql`
  })
});

export const FETCH_REPOSITORIES = gql`
  query {
    repositories {
      name
    }
  }
`;

export const FETCH_ARTICLES = gql`
  query {
    articles {
      path
    }
  }
`;

export const FETCH_ARTICLE = gql`
  query Article($path: String!) {
    article(path: $path) {
      path
      markdown
    }
  }
`;
