#!/bin/bash

PR="https://api.github.com/repos/${TRAVIS_REPO_SLUG}/pulls/${TRAVIS_PULL_REQUEST}"
HEROKU_SLUG="${HEROKU_APP_NAME}-pr-${TRAVIS_PULL_REQUEST}"
HEROKU_APP_URL="https://${HEROKU_SLUG}.herokuapp.com"

TIMEOUT_LIMIT=180
TIMEOUT_SLEEP=5

if [ $TRAVIS_PULL_REQUEST != "false" ]; then

  n=0
  app_ready=false
  pr_url="https://api.github.com/repos/${TRAVIS_REPO_SLUG}/pulls/${TRAVIS_PULL_REQUEST}"
  pull_request=$(curl -s -H "Authorization: token ${GITHUB_TOKEN}" $pr_url)

  COMMIT=$(echo $pull_request | jq -r .head.sha)
  BRANCH=$(echo $pull_request | jq -r .head.ref)

  until [ $n -ge $((TIMEOUT_LIMIT/TIMEOUT_SLEEP)) ]
  do
    if [ "$(curl -s ${HEROKU_APP_URL}/healthcheck | jq -r .sha)" == $COMMIT ]; then
      app_ready=true
      break
    fi

    n=$[$n+1]
    sleep $TIMEOUT_SLEEP
  done

  # if app not found => exit with error
  if ! $app_ready ; then
    echo "$HEROKU_SLUG failed to bootstrap and timeout reached"
    exit 1
  fi

  # run acceptance tests
  WDIO_BASEURL=$HEROKU_APP_URL npm run test:acceptance-cloud

fi
