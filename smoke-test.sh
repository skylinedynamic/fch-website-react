#!/bin/bash

# Smoke test script for FCH Website
URL="https://fourcornerfunding.com/"

echo "Checking $URL..."
STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$URL")

if [ "$STATUS" -eq 200 ]; then
  echo "SUCCESS: $URL is up and running!"
  exit 0
else
  echo "FAILURE: $URL returned status $STATUS"
  exit 1
fi
