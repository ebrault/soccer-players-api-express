#!/bin/bash

API="http://localhost:4741"
URL_PATH="/countries"

curl "${API}${URL_PATH}" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer ${TOKEN}" \
  --data '{
    "country": {
      "name": "'"${NAME}"'",
      "continent": "'"${CON}"'",
      "confederation": "'"${CONF_ID}"'"
    }
  }'

echo
