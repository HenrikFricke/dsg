import * as React from "react";

import { FetchRepositoriesQueryRepository } from "../client";

export interface Props {
  repositories: FetchRepositoriesQueryRepository[];
}

export const Repositories: React.StatelessComponent<Props> = props => (
  <ul>{props.repositories.map(({ name }) => <li key={name}>{name}</li>)}</ul>
);
