import {
  FETCH_REPOSITORIES,
  FetchRepositoriesQuery,
  githubClient
} from "../githubClient";

export async function repositories() {
  const response = await githubClient.query<FetchRepositoriesQuery>({
    query: FETCH_REPOSITORIES
  });

  return response.data.user.repositories.nodes;
}
