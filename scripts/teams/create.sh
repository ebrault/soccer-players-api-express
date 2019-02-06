#!/bin/bash

API="http://localhost:4741"
URL_PATH="/teams"

curl "${API}${URL_PATH}" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --data '{
    "team": {
      "name": "'"${NAME}"'",
      "nickname": "'"${NICK}"'",
      "stadium": "'"${STD}"'",
      "league": "'"${LEA}"'"
    }
  }'

echo
