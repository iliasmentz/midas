#!/usr/bin/env bash
set -e
cp .docker-compose.env.sample .docker-compose.env
docker-compose -f docker-compose.test.yml build
docker-compose -f docker-compose.test.yml up -d
docker-compose -f docker-compose.test.yml exec api npm run wait:api
docker-compose -f docker-compose.test.yml exec api npm run functionaltests:run
docker-compose -f docker-compose.test.yml down -v
