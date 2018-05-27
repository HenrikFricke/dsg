import {
  FETCH_REPOSITORIES,
  FetchRepositoriesQuery,
  GITHUB_ENDPOINT
} from "../github";

export async function repositories() {
  const requestBody = {
    query: FETCH_REPOSITORIES
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
  const data = body.data as FetchRepositoriesQuery;

  return data.user.repositories.nodes;
}
