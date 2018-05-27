import { FETCH_ARTICLE, FetchArticleQuery, GITHUB_ENDPOINT } from "../github";
import { Article } from "../schema";

interface Arguments {
  path: string;
}

export async function article(
  obj: any,
  args: Arguments
): Promise<Article | null> {
  const requestBody = {
    query: FETCH_ARTICLE,
    variables: {
      expression: `master:${args.path}.md`
    }
  };

  const response = await fetch(GITHUB_ENDPOINT, {
    body: JSON.stringify(requestBody),
    headers: {
      Authorization: process.env.GITHUB_TOKEN || "",
      "Content-Type": "application/json"
    },
    method: "POST"
  });

  const body = await response.json();
  const data = body.data as FetchArticleQuery;
  const object = data.repository.object;

  if (!object) {
    return null;
  }

  return {
    markdown: object.text,
    path: args.path
  };
}
