#!/bin/bash

API="http://localhost:4741"
URL_PATH="/leagues"

curl "${API}${URL_PATH}" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer ${TOKEN}" \
  --data '{
    "league": {
      "name": "'"${NAME}"'",
      "country": "'"${COU}"'"
    }
  }'

echo
