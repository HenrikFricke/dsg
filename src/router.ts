import { StaticContext } from "react-router";

export interface StaticRouterContext extends StaticContext {
  url?: string;
  status?: number;
}
