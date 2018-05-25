import * as React from "react";

import { Route, Switch } from "react-router";

import { About } from "./About";
import { BlogPost } from "./BlogPost";
import { Home } from "./Home";
import { NoMatch } from "./NoMatch";

export const App: React.StatelessComponent = () => {
  return (
    <html>
      <head>
        <title>Home | Dynamic Site Generator</title>
      </head>
      <body>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/blog/:article" component={BlogPost} />
          <Route component={NoMatch} />
        </Switch>
      </body>
    </html>
  );
};
