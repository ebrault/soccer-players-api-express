#!/bin/bash

API="http://localhost:4741"
URL_PATH="/leagues"

curl "${API}${URL_PATH}/${ID}" \
  --include \
  --request PATCH \
  --header "Content-Type: application/json" \
  --data '{
    "league": {
      "name": "'"${NAME}"'",
      "country": "'"${COU}"'"
    }
  }'

echo
