#!/bin/bash

API="http://localhost:4741"
URL_PATH="/countries"

curl "${API}${URL_PATH}" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --data '{
    "country": {
      "name": "'"${NAME}"'",
      "continent": "'"${CON}"'",
      "body": "'"${BOD}"'"
    }
  }'

echo
