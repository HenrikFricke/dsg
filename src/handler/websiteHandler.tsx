import * as React from "react";

import { IncomingMessage, ServerResponse } from "http";
import { ApolloProvider, renderToStringWithData } from "react-apollo";
import { renderToStaticMarkup } from "react-dom/server";
import { StaticRouter } from "react-router";

import { client } from "../client";
import { App } from "../components/App";
import { Html } from "../components/Html";

import { StaticRouterContext } from "../router";

export async function websiteHandler(
  req: IncomingMessage,
  res: ServerResponse
) {
  const context: StaticRouterContext = {};

  const component = (
    <StaticRouter location={req.url} context={context}>
      <ApolloProvider client={client()}>
        <App />
      </ApolloProvider>
    </StaticRouter>
  );

  const content = await renderToStringWithData(component);
  const html = renderToStaticMarkup(<Html content={content} />);

  res.statusCode = context.status || context.statusCode || 200;
  res.write(`<!doctype html>\n${html}`);
  res.end();
}
