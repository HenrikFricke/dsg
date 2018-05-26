import * as React from "react";

import { Query, QueryResult } from "react-apollo";
import { Link } from "react-router-dom";

import { FETCH_ARTICLES } from "../client";

interface FetchArticlesQueryArticle {
  path: string;
  markdown: string;
}

interface FetchArticlesQuery {
  articles: FetchArticlesQueryArticle[];
}

export const BlogList: React.StatelessComponent<{}> = () => {
  return (
    <Query query={FETCH_ARTICLES}>
      {({ data, loading, error }: QueryResult<FetchArticlesQuery>) => {
        if (loading || error || data === undefined) {
          return null;
        }

        return (
          <ul>
            {data.articles.map(({ path }) => (
              <li key={path}>
                <Link to={`blog/${path}`}>{path}</Link>
              </li>
            ))}
          </ul>
        );
      }}
    </Query>
  );
};
