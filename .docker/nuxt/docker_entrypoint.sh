#!/bin/sh

set -e
# Capture the output of `printenv`
output=$(printenv)
# Use a regular expression to filter the desired variables
filtered_output=$(echo "$output" | grep -E '^VITE_|^NUXT_')

# Print the filtered output
echo "$filtered_output"
echo "$filtered_output" > /code/.env

echo "Environment variables written to .env"

exec "$@"