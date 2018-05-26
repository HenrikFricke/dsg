import { config } from "dotenv";
config();

import * as React from "react";

import micro, { send } from "micro";
import { ApolloProvider, renderToStringWithData } from "react-apollo";

import { IncomingMessage, ServerResponse } from "http";
import { StaticRouter } from "react-router";

import { App } from "./components/App";
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

  const html = await renderToStringWithData(component);
  send(res, context.status || context.statusCode || 200, html);
});

server.listen(process.env.PORT || 3000);
