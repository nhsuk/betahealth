#!/bin/bash

if [ $TRAVIS_BRACH = "master" && $TRAVIS_PULL_REQUEST = "false" ]; then
  npm run autorelease
fi
