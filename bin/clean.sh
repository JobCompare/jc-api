#!/bin/bash

ROOT=$PWD
TARGETS=("node_modules" "npm-debug.log" "apidoc" "apidoc.json" "coverage" ".nyc_output")
ARGUMENTS=( "$@" )
SHRED=`which shred`
APIDOC_URL="http://localhost:3000"

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

for argument in "${ARGUMENTS[@]}"
 do
   if [ "$argument" == "install" ]
   then
     npm install
   elif [ "$argument" != "clean" ]
   then
     npm run "$argument"
   fi
 done
