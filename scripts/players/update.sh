#!/bin/bash

API="http://localhost:4741"
URL_PATH="/players"

curl "${API}${URL_PATH}/${ID}" \
  --include \
  --request PATCH \
  --header "Content-Type: application/json" \
  --data '{
    "player": {
      "name": "'"${NAME}"'",
      "number": "'"${NUM}"'",
      "position": "'"${POS}"'",
      "team": "'"${TEAM}"'"
    }
  }'

echo
