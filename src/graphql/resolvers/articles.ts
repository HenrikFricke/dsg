import {
  FETCH_ARTICLES,
  FetchArticlesQuery,
  githubClient
} from "../githubClient";

import { Article } from "../schema";

export async function articles(): Promise<Article[]> {
  const response = await githubClient.query<FetchArticlesQuery>({
    query: FETCH_ARTICLES
  });

  return response.data.repository.object.entries.map(entry => ({
    markdown: entry.object.text,
    path: entry.name.split(".")[0]
  }));
}
