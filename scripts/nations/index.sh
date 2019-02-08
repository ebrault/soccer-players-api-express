#!/bin/bash

API="http://localhost:4741"
URL_PATH="/nations"

curl "${API}${URL_PATH}" \
  --include \
  --request GET

echo
