import * as React from "react";

import { Link } from "react-router-dom";

import { FetchArticlesQueryArticle } from "../client";

export interface Props {
  blogposts: FetchArticlesQueryArticle[];
}

export const BlogList: React.StatelessComponent<Props> = props => (
  <ul>
    {props.blogposts.map(({ path }) => (
      <li key={path}>
        <Link to={`blog/${path}`}>{path}</Link>
      </li>
    ))}
  </ul>
);
