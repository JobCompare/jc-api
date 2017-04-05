#!/bin/bash

ROOT=$PWD
TARGETS=("node_modules" "npm-debug.log" "apidoc")
SHRED=`which shred`

for target in "${TARGETS[@]}"
do
  echo "Cleaning... ${target}"
  if [ ! -z "${SHRED}" ]
  then
    shred --force --zero --remove --verbose ${target}
  else
    rm -rf ${target}
  fi
done
