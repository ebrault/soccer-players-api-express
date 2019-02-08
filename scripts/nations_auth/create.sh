#!/bin/bash

API="http://localhost:4741"
URL_PATH="/nations"

curl "${API}${URL_PATH}" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer ${TOKEN}" \
  --data '{
    "nation": {
      "name": "'"${NAME}"'",
      "continent": "'"${CON}"'",
      "administrator": "'"${ADM}"'"
    }
  }'

echo
