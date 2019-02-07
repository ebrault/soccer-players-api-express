#!/bin/bash

API="http://localhost:4741"
URL_PATH="/countries"

curl "${API}${URL_PATH}/${ID}" \
  --include \
  --request DELETE \

echo
