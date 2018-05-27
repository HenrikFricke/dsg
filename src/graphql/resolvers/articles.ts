import { FETCH_ARTICLES, FetchArticlesQuery, GITHUB_ENDPOINT } from "../github";

import { Article } from "../schema";

export async function articles(): Promise<Article[]> {
  const requestBody = {
    query: FETCH_ARTICLES
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
  const data = body.data as FetchArticlesQuery;

  return data.repository.object.entries.map(entry => ({
    markdown: entry.object.text,
    path: entry.name.split(".")[0]
  }));
}
