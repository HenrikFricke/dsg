import * as React from "react";
import { Query, QueryResult } from "react-apollo";

import { FETCH_REPOSITORIES } from "../githubClient";

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

export const Repositories: React.StatelessComponent = () => {
  return (
    <Query query={FETCH_REPOSITORIES}>
      {({ data, loading, error }: QueryResult<FetchRepositoriesQuery>) => {
        if (loading) {
          return <p>Loading...</p>;
        }

        if (error || data === undefined) {
          return <p>Error :(</p>;
        }

        return (
          <ul>
            {data.user.repositories.nodes.map(({ name }) => (
              <li key={name}>{name}</li>
            ))}
          </ul>
        );
      }}
    </Query>
  );
};
