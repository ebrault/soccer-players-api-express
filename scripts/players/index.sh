#!/bin/bash

API="http://localhost:4741"
URL_PATH="/players"

curl "${API}${URL_PATH}" \
  --include \
  --request GET \

echo
