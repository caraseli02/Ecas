#!/bin/bash

set -e

# Capture environment variables starting with VITE_ and NUXT_
env | grep ^VITE_ | grep -vE '^(_|PATH|PWD|HOME|BASH|SHLVL|USER|...)' >> .env
env | grep ^NUXT_ | grep -vE '^(_|PATH|PWD|HOME|BASH|SHLVL|USER|...)' >> .env

echo "Environment variables written to .env"

exec "$@"