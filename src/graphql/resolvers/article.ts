import {
  FETCH_ARTICLE,
  FetchArticleQuery,
  githubClient
} from "../githubClient";

import { Article } from "../schema";

interface Arguments {
  path: string;
}

export async function article(
  obj: any,
  args: Arguments
): Promise<Article | null> {
  const response = await githubClient.query<FetchArticleQuery>({
    query: FETCH_ARTICLE,
    variables: { expression: `master:${args.path}.md` }
  });
  const object = response.data.repository.object;

  if (!object) {
    return null;
  }

  return {
    markdown: object.text,
    path: args.path
  };
}
