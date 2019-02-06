#!/bin/bash

API="http://localhost:4741"
URL_PATH="/teams"

curl "${API}${URL_PATH}/${ID}" \
  --include \
  --request PATCH \
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
