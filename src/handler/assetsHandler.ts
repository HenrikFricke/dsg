import * as fs from "fs";

import { send } from "micro";
import { ServerRequest, ServerResponse } from "microrouter";
import { getType } from "mime";
import { join } from "path";
import { promisify } from "util";

const readFileAsync = promisify(fs.readFile);

export async function assetsHandler(req: ServerRequest, res: ServerResponse) {
  const file = join(__dirname, `../assets/${req.params.file}`);

  try {
    const fileContent = await readFileAsync(file);
    res.setHeader("Content-Type", getType(file) || "");
    send(res, 200, fileContent);
  } catch (err) {
    send(res, 404);
  }
}
