import * as React from "react";

import { readdirSync } from "fs";
import { resolve } from "path";
import { Link } from "react-router-dom";

export interface Params {
  article: string;
}

export const BlogList: React.StatelessComponent<{}> = () => {
  try {
    const markdownDir = resolve(__dirname, `../articles`);
    const markdownFiles = readdirSync(markdownDir);

    return (
      <ul>
        {markdownFiles.map(file => {
          const fileWithoutExtension = file.split(".")[0];

          return (
            <li key={fileWithoutExtension}>
              <Link to={`blog/${fileWithoutExtension}`}>
                {fileWithoutExtension}
              </Link>
            </li>
          );
        })}
      </ul>
    );
  } catch (err) {
    return null;
  }
};
