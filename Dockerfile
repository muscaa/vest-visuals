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
# sharp's native parts. Its JavaScript is bundled into .output/server/_libs/sharp.mjs, but that file loads the
# binding with createRequire (`require("@img/sharp-linuxmusl-x64/sharp.node")`), and a .node binary can't be
# bundled, so the packages have to be on disk for node to find them by walking up to /app/node_modules. The whole
# @img folder, not just the binding: sharp.node links libvips from the sibling @img/sharp-libvips-* package.
COPY --from=build --chown=node:node /app/node_modules/@img ./node_modules/@img

USER node
EXPOSE 3000
CMD ["node", ".output/server/index.mjs"]
