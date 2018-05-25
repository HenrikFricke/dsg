import * as React from "react";

import micro, { send } from "micro";

import { IncomingMessage, ServerResponse } from "http";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router";

import { App } from "./components/App";
import { StaticRouterContext } from "./router";

const server = micro((req: IncomingMessage, res: ServerResponse) => {
  const context: StaticRouterContext = {};

  const html = renderToString(
    <StaticRouter location={req.url} context={context}>
      <App />
    </StaticRouter>
  );

  send(res, context.status || context.statusCode || 200, html);
});

server.listen(process.env.PORT || 3000);
