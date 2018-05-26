import * as React from "react";
import { Link } from "react-router-dom";

import {
  FetchArticlesQueryArticle,
  FetchRepositoriesQueryRepository
} from "../client";
import { BlogList } from "./BlogList";
import { Repositories } from "./Repositories";

export interface Props {
  blogposts: FetchArticlesQueryArticle[];
  repositories: FetchRepositoriesQueryRepository[];
}

export const Home: React.StatelessComponent<Props> = props => {
  return (
    <>
      <h1>Home</h1>
      <Link to="about">About</Link>
      <h2>Posts</h2>
      <BlogList blogposts={props.blogposts} />
      <h2>Repositories</h2>
      <Repositories repositories={props.repositories} />
    </>
  );
};
