import { makeExecutableSchema } from "graphql-tools";

import { article } from "./resolvers/article";
import { articles } from "./resolvers/articles";
import { repositories } from "./resolvers/repositories";

// The GraphQL schema in string form
const typeDefs = `
  type Query {
    repositories: [Repository]
    articles: [Article]
    article(path: String): Article
  }

  type Repository { name: String }

  type Article { path: String, markdown: String }
`;

// The resolvers
const resolvers = {
  Query: {
    article,
    articles,
    repositories
  }
};

// Put together a schema
export const schema = makeExecutableSchema({
  resolvers,
  typeDefs
});
