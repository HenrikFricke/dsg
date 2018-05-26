import * as React from "react";
import { Query, QueryResult } from "react-apollo";

import {
  FETCH_ARTICLES,
  FETCH_REPOSITORIES,
  FetchArticlesQuery,
  FetchRepositoriesQuery
} from "../client";
import { Home } from "../components/Home";

export const HomeRoute: React.StatelessComponent = () => {
  return (
    <Query query={FETCH_ARTICLES}>
      {(articlesResult: QueryResult<FetchArticlesQuery>) => (
        <Query query={FETCH_REPOSITORIES}>
          {(reposResults: QueryResult<FetchRepositoriesQuery>) => {
            if (
              articlesResult.loading ||
              articlesResult.error ||
              articlesResult.data === undefined ||
              reposResults.loading ||
              reposResults.error ||
              reposResults.data === undefined
            ) {
              return null;
            }

            return (
              <Home
                blogposts={articlesResult.data.articles}
                repositories={reposResults.data.repositories}
              />
            );
          }}
        </Query>
      )}
    </Query>
  );
};
