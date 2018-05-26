import * as React from "react";
import * as ReactMarkdown from "react-markdown";

import { FetchArticlesQueryArticle } from "../client";

export interface Props {
  blogpost: FetchArticlesQueryArticle;
}

export const BlogPost: React.StatelessComponent<Props> = props => (
  <ReactMarkdown source={props.blogpost.markdown.toString()} />
);
