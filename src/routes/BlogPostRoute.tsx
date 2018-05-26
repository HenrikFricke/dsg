import * as React from "react";

import { Query, QueryResult } from "react-apollo";
import { RouteComponentProps } from "react-router";

import { FETCH_ARTICLE, FetchArticleQuery } from "../client";
import { BlogPost } from "../components/BlogPost";
import { NoMatch } from "../components/NoMatch";
import { StaticRouterContext } from "../router";

export interface Params {
  article: string;
}

export type Props = RouteComponentProps<Params, StaticRouterContext>;

export const BlogPostRoute: React.StatelessComponent<Props> = props => {
  return (
    <Query
      query={FETCH_ARTICLE}
      variables={{ path: props.match.params.article }}
    >
      {(articleResult: QueryResult<FetchArticleQuery>) => {
        if (articleResult.loading) {
          return null;
        }

        if (
          articleResult.error ||
          !articleResult.data ||
          !articleResult.data.article
        ) {
          return <NoMatch {...props} />;
        }

        return <BlogPost blogpost={articleResult.data.article} />;
      }}
    </Query>
  );
};
