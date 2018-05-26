import * as React from "react";
import { RouteComponentProps } from "react-router";

import { StaticRouterContext } from "../router";

export type Props = RouteComponentProps<{}, StaticRouterContext>;

export const NoMatch: React.StatelessComponent<Props> = props => {
  if (props.staticContext) {
    props.staticContext.status = 404;
  }

  return <h1>404</h1>;
};
