import "cross-fetch/polyfill";

import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";

import gql from "graphql-tag";

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  defaultOptions: {
    query: {
      fetchPolicy: "network-only"
    }
  },
  link: new HttpLink({
    uri: `${process.env.DSG_BASE_URL}/graphql`
  })
});

export interface FetchArticlesQueryArticle {
  path: string;
  markdown: string;
}

export interface FetchArticlesQuery {
  articles: FetchArticlesQueryArticle[];
}

export interface FetchRepositoriesQueryRepository {
  name: string;
}

export interface FetchRepositoriesQuery {
  repositories: FetchRepositoriesQueryRepository[];
}

export interface FetchArticleQuery {
  article?: FetchArticlesQueryArticle;
}

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
