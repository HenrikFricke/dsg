#!/bin/sh

now -e GITHUB_TOKEN=@github_token -e DSG_BASE_URL=https://dsg.now.sh
now alias
now rm dsg -s -y
