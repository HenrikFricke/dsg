import { readFileSync } from "fs";
import { resolve } from "path";

interface Arguments {
  path: string;
}

export function article(obj: any, args: Arguments) {
  try {
    const markdownFile = resolve(__dirname, `../../articles/${args.path}.md`);
    const markdown = readFileSync(markdownFile);

    return {
      markdown: markdown.toString(),
      path: args.path
    };
  } catch (err) {
    throw new Error(err);
  }
}
