#!/bin/bash

API="http://localhost:4741"
URL_PATH="/players"

curl "${API}${URL_PATH}" \
  --include \
  --request POST \
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
