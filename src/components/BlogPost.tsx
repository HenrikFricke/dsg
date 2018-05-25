import * as React from "react";
import * as ReactMarkdown from "react-markdown";

import { readFileSync } from "fs";
import { resolve } from "path";
import { RouteComponentProps } from "react-router";

import { StaticRouterContext } from "../router";
import { NoMatch } from "./NoMatch";

export interface Params {
  article: string;
}

export type Props = RouteComponentProps<Params, StaticRouterContext>;

export const BlogPost: React.StatelessComponent<Props> = props => {
  try {
    const markdownFile = resolve(
      __dirname,
      `../articles/${props.match.params.article}.md`
    );
    const markdown = readFileSync(markdownFile);

    return <ReactMarkdown source={markdown.toString()} />;
  } catch (err) {
    return <NoMatch {...props} />;
  }
};
