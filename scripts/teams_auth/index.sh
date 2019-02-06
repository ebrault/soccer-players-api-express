#!/bin/bash

API="http://localhost:4741"
URL_PATH="/teams"

curl "${API}${URL_PATH}" \
  --include \
  --request GET \
  --header "Authorization: Bearer ${TOKEN}"

echo
