#
# Builder stage.
# This state compile our TypeScript to get the JavaScript code
#
FROM node:14.8.0 AS builder

WORKDIR /usr/src/app

COPY package*.json ./
COPY tsconfig*.json ./
COPY ./db ./db
COPY ./src ./src
RUN npm ci --quiet && npm run build

#
# Production stage.
# This state compile get back the JavaScript code from builder stage
# It will also install the production package only
#
FROM node:14.8.0-alpine

RUN npm install pm2@4.4.1 -g


WORKDIR /app
ENV NODE_ENV=production

COPY package*.json ./
ENV NPM_CONFIG_LOGLEVEL warn
RUN npm ci --quiet --only=production

COPY ecosystem.config.js /app
COPY scripts/docker-entrypoint.sh /app
RUN chmod +x /app/docker-entrypoint.sh

## We just need the build to execute the command
COPY --from=builder /usr/src/app/build ./build
CMD ["/app/docker-entrypoint.sh"]
