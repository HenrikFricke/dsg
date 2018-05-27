import { createHmac } from "crypto";
import { text } from "micro";
import { ServerRequest, ServerResponse } from "microrouter";

export async function purgeHandler(req: ServerRequest, res: ServerResponse) {
  const payload = await text(req);

  const hash = createHmac("sha1", process.env.WEBHOOK_PURGE_SECRET || "")
    .update(payload)
    .digest("hex");
  const signature = `sha1=${hash}`;

  if (signature !== req.headers["x-hub-signature"]) {
    res.statusCode = 400;
  } else {
    const requestBody = { purge_everything: true };

    await fetch(process.env.CLOUDFLARE_PURGE_CACHE_ENDPOINT, {
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
        "X-Auth-Email": process.env.CLOUDFLARE_AUTH_EMAIL || "",
        "X-Auth-Key": process.env.CLOUDFLARE_API_KEY || ""
      },
      method: "POST"
    });
  }

  res.end();
}
