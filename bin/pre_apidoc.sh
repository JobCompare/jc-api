#!/bin/bash

APIDOC_URL="http://localhost:8080"

if [ "${SERVER_ENV}" != "" ]
then
  APIDOC_URL="${API_URL}"
fi

APIDOC_CONFIG="{
  \"name\": \"Job Compare\",
  \"version\": \"0.1.0\",
  \"description\": \"Job Compare API\",
  \"title\": \"Job Compare\",
  \"url\" : \"${APIDOC_URL}\",
  \"sampleUrl\": \"${APIDOC_URL}\"
}"

echo "${APIDOC_CONFIG}" > "apidoc.json"
