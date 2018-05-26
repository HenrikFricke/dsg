import * as React from "react";

import { Route, Switch } from "react-router";

import { BlogPostRoute } from "../routes/BlogPostRoute";
import { HomeRoute } from "../routes/HomeRoute";
import { About } from "./About";
import { NoMatch } from "./NoMatch";

export const App: React.StatelessComponent = () => {
  return (
    <Switch>
      <Route exact path="/" component={HomeRoute} />
      <Route path="/about" component={About} />
      <Route path="/blog/:article" component={BlogPostRoute} />
      <Route component={NoMatch} />
    </Switch>
  );
};
