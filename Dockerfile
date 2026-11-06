FROM node:24-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build



FROM node:24-alpine
WORKDIR /app
ENV NODE_ENV=production \
    HOST=0.0.0.0 \
    PORT=3000

COPY --from=build --chown=node:node /app/.output ./.output
# what .output/migrate.cjs applies before the app starts (the app stack's `migrate` service): the app's migrations,
# and the workflow engine's, at the path it reads them from
COPY --from=build --chown=node:node /app/drizzle ./drizzle
COPY --from=build --chown=node:node /app/node_modules/@workflow/world-postgres/src/drizzle/migrations ./node_modules/@workflow/world-postgres/src/drizzle/migrations

USER node
EXPOSE 3000
CMD ["node", ".output/server/index.mjs"]
