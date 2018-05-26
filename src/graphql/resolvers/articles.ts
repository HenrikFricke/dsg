import { readdirSync, readFileSync } from "fs";
import { resolve } from "path";

export function articles() {
  try {
    const markdownDir = resolve(__dirname, `../../articles`);
    const markdownFiles = readdirSync(markdownDir);

    return markdownFiles.map(file => {
      const fileWithoutExtension = file.split(".")[0];
      const markdownFile = resolve(__dirname, `../../articles/${file}`);
      const markdown = readFileSync(markdownFile);

      return {
        markdown: markdown.toString(),
        path: fileWithoutExtension
      };
    });
  } catch (err) {
    return [];
  }
}
