#!/bin/sh
echo "copiando environments"

set -xe
: "${API_ENDPOINT?Need an api url}"

sed -i "s/API_ENDPOINT/$API_ENDPOINT/g" /usr/share/nginx/html/main*bundle.js

echo "exito"

nginx -g 'daemon off;'

exec "$@"