# Typescript Dockerfile

```dockerfile
FROM node:14-alpine as builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . ./

RUN npm run build && npm prune --production
# ---

FROM node:14-alpine

WORKDIR /app

COPY --from=builder /app/package*.json /app/
COPY --from=builder /app/dist/ /app/dist/
COPY --from=builder /app/node_modules/ /app/node_modules/
COPY --from=builder /app/.env /app/.env

EXPOSE 8200
ENTRYPOINT [ "node" ]
CMD [ "dist/main.js" ]
```
