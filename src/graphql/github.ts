export const GITHUB_ENDPOINT = "https://api.github.com/graphql";

export interface FetchRepositoriesQueryRepository {
  name: string;
}

export interface FetchRepositoriesQuery {
  user: {
    repositories: {
      nodes: FetchRepositoriesQueryRepository[];
    };
  };
}

export const FETCH_REPOSITORIES = `
  query {
    user(login: "HenrikFricke") {
      repositories(
        first: 10
        privacy: PUBLIC
        isFork: false
        orderBy: { field: CREATED_AT, direction: DESC }
      ) {
        nodes {
          name
        }
      }
    }
  }
`;

export interface FetchArticlesQueryArticle {
  name: string;
  object: {
    text: string;
  };
}

export interface FetchArticlesQuery {
  repository: {
    object: {
      entries: FetchArticlesQueryArticle[];
    };
  };
}

export const FETCH_ARTICLES = `
  query {
    repository(owner: "HenrikFricke", name: "dsg-blogposts") {
      object(expression: "master:") {
        ... on Tree {
          entries {
            name
            object {
              ... on Blob {
                text
              }
            }
          }
        }
      }
    }
  }
`;

export interface FetchArticleQuery {
  repository: {
    object?: {
      text: string;
    };
  };
}

export const FETCH_ARTICLE = `
  query Article($expression: String!) {
    repository(owner: "HenrikFricke", name: "dsg-blogposts") {
      object(expression: $expression) {
        ... on Blob {
          text
        }
      }
    }
  }
`;
