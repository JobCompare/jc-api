#!/bin/bash

ROOT=$PWD
ENVIRONMENTS=("default" "development" "staging" "production")
HOOKS=("pre-push")

if [ -z "${NODE_ENV}" ]
then
  NODE_ENV="development"
fi

if [ ! -d "${ROOT}/config" ]
then
  mkdir config
fi

cd "${ROOT}/config"
for env in "${ENVIRONMENTS[@]}"
do
  if [ ! -e "${env}.json" ]
  then
    echo "{}" >> "${env}.json"
  fi
done
cd ${ROOT}

npm run apidoc

for hook in "${HOOKS[@]}"
do
  if [ "${NODE_ENV}" == "development" ] && [ -e "${ROOT}/bin/resources/hooks/${hook}.sh" ]
  then
    cp "${ROOT}/bin/resources/hooks/${hook}.sh" "${ROOT}/.git/hooks/${hook}"
    chmod +x "${ROOT}/.git/hooks/${hook}"
  fi
done
