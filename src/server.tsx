import { config } from "dotenv";
config();

import * as React from "react";

import micro from "micro";
import { ApolloProvider, renderToStringWithData } from "react-apollo";
import { renderToStaticMarkup } from "react-dom/server";

import { IncomingMessage, ServerResponse } from "http";
import { StaticRouter } from "react-router";

import { App } from "./components/App";
import { Html } from "./components/Html";
import { client } from "./githubClient";
import { StaticRouterContext } from "./router";

const server = micro(async (req: IncomingMessage, res: ServerResponse) => {
  const context: StaticRouterContext = {};

  const component = (
    <StaticRouter location={req.url} context={context}>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </StaticRouter>
  );

  const content = await renderToStringWithData(component);
  const html = renderToStaticMarkup(<Html content={content} />);

  res.statusCode = context.status || context.statusCode || 200;
  res.write(`<!doctype html>\n${html}`);
  res.end();
});

server.listen(process.env.PORT || 3000);
