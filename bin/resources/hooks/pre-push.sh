#!/bin/bash

ROOT=$PWD
COMMANDS=("lint" "test")

if [ -z "${NODE_ENV}" ]
then
  NODE_ENV="development"
fi

echo '---------- PRE-PUSH SCRIPT START ----------'

npm install --silent
if [ "${NODE_ENV}" != "development" ]
then
  npm install --only=dev
fi

for cmd in "${COMMANDS[@]}"
do
  npm run "${cmd}"
  return_code=$?
  if [ ${return_code} != 0 ]
  then
    echo '---------- PRE-PUSH SCRIPT END ----------'
    exit ${return_code}
  fi
done

python "${ROOT}/bin/resources/coverage_parser.py" --from pre-push

echo '---------- PRE-PUSH SCRIPT END ----------'
