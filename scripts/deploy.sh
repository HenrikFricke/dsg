#!/bin/sh

now -e GITHUB_TOKEN=@github_token \
  -e DSG_BASE_URL=https://dsg.now.sh \
  -e CLOUDFLARE_API_KEY=@cloudflareapikey \
  -e CLOUDFLARE_AUTH_EMAIL=@cloudflareauthemail \
  -e CLOUDFLARE_PURGE_CACHE_ENDPOINT=@cloudflarepurgecacheendpoint
  -e WEBHOOK_PURGE_SECRET=@webhookpurgesecret
now alias
now rm dsg -s -y
