import { config } from "dotenv";
config();

import * as React from "react";

import { microGraphiql, microGraphql } from "apollo-server-micro";
import { IncomingMessage, ServerResponse } from "http";
import micro from "micro";
import { get, post, router } from "microrouter";
import { ApolloProvider, renderToStringWithData } from "react-apollo";
import { renderToStaticMarkup } from "react-dom/server";
import { StaticRouter } from "react-router";

import { client } from "./client";
import { App } from "./components/App";
import { Html } from "./components/Html";
import { schema } from "./graphql/schema";
import { StaticRouterContext } from "./router";

const graphqlHandler = microGraphql({ schema });
const graphiqlHandler = microGraphiql({ endpointURL: "/graphql" });

const viewRenderer = async (req: IncomingMessage, res: ServerResponse) => {
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
};

const server = micro(
  router(
    get("/graphql", graphqlHandler),
    post("/graphql", graphqlHandler),
    get("/graphiql", graphiqlHandler),
    viewRenderer
  )
);

server.listen(process.env.PORT || 3000);
