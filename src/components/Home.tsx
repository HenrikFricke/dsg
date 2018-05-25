import * as React from "react";
import { Link } from "react-router-dom";

import { BlogList } from "./BlogList";

export const Home: React.StatelessComponent = () => {
  return (
    <>
      <h1>Home</h1>
      <Link to="about">About</Link>
      <h2>Posts</h2>
      <BlogList />
    </>
  );
};
