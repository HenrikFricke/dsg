import { config } from "dotenv";
config();

import micro from "micro";

import { microGraphiql, microGraphql } from "apollo-server-micro";
import { get, post, router } from "microrouter";

import { schema } from "./graphql/schema";
import { assetsHandler } from "./handler/assetsHandler";
import { purgeHandler } from "./handler/purgeHandler";
import { websiteHandler } from "./handler/websiteHandler";

const graphqlHandler = microGraphql({ schema });
const graphiqlHandler = microGraphiql({ endpointURL: "/graphql" });

const server = micro(
  router(
    post("/webhooks/purge", purgeHandler),
    get("/graphql", graphqlHandler),
    post("/graphql", graphqlHandler),
    get("/graphiql", graphiqlHandler),
    get("/assets/:file", assetsHandler),
    websiteHandler
  )
);

server.listen(process.env.PORT || 3000);
