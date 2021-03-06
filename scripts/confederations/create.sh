#!/bin/bash

API="http://localhost:4741"
URL_PATH="/confederations"

curl "${API}${URL_PATH}" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --data '{
    "confederation": {
      "name": "'"${NAME}"'"
    }
  }'

echo
