import * as React from "react";
import * as ReactMarkdown from "react-markdown";

import { Query, QueryResult } from "react-apollo";
import { RouteComponentProps } from "react-router";

import { FETCH_ARTICLE } from "../client";
import { StaticRouterContext } from "../router";
import { NoMatch } from "./NoMatch";

export interface Params {
  article: string;
}

export type Props = RouteComponentProps<Params, StaticRouterContext>;

interface FetchArticlesQueryArticle {
  path: string;
  markdown: string;
}

interface FetchArticleQuery {
  article: FetchArticlesQueryArticle;
}

export const BlogPost: React.StatelessComponent<Props> = props => {
  return (
    <Query
      query={FETCH_ARTICLE}
      variables={{ path: props.match.params.article }}
    >
      {({ data, loading, error }: QueryResult<FetchArticleQuery>) => {
        if (loading) {
          return null;
        }

        if (error || data === undefined) {
          return <NoMatch {...props} />;
        }

        return <ReactMarkdown source={data.article.markdown.toString()} />;
      }}
    </Query>
  );
};
