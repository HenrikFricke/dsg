import gql from "graphql-tag";

import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";

interface FetchRepositoriesQueryRepository {
  name: string;
}

interface FetchRepositoriesQuery {
  user: {
    repositories: {
      nodes: FetchRepositoriesQueryRepository[];
    };
  };
}

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

export async function repositories() {
  const githubClient = new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      headers: {
        Authorization: process.env.GITHUB_TOKEN
      },
      uri: "https://api.github.com/graphql"
    })
  });

  const response = await githubClient.query<FetchRepositoriesQuery>({
    query: FETCH_REPOSITORIES
  });

  return response.data.user.repositories.nodes;
}
