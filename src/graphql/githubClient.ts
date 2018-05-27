import gql from "graphql-tag";

import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";

export const githubClient = new ApolloClient({
  cache: new InMemoryCache(),
  defaultOptions: {
    query: {
      fetchPolicy: "network-only"
    }
  },
  link: new HttpLink({
    headers: {
      Authorization: process.env.GITHUB_TOKEN
    },
    uri: "https://api.github.com/graphql"
  })
});

export interface FetchRepositoriesQueryRepository {
  name: string;
}

export interface FetchRepositoriesQuery {
  user: {
    repositories: {
      nodes: FetchRepositoriesQueryRepository[];
    };
  };
}

export const FETCH_REPOSITORIES = gql`
  query {
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

export interface FetchArticlesQueryArticle {
  name: string;
  object: {
    text: string;
  };
}

export interface FetchArticlesQuery {
  repository: {
    object: {
      entries: FetchArticlesQueryArticle[];
    };
  };
}

export const FETCH_ARTICLES = gql`
  query {
    repository(owner: "HenrikFricke", name: "dsg-blogposts") {
      object(expression: "master:") {
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
`;

export interface FetchArticleQuery {
  repository: {
    object?: {
      text: string;
    };
  };
}

export const FETCH_ARTICLE = gql`
  query Article($expression: String!) {
    repository(owner: "HenrikFricke", name: "dsg-blogposts") {
      object(expression: $expression) {
        ... on Blob {
          text
        }
      }
    }
  }
`;
