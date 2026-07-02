FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
# --include=dev: garante o typescript (devDependency) mesmo se NODE_ENV=production
# vazar pro ambiente de build, senão `npm run build` (tsc) falha com "not found".
RUN npm install --include=dev
COPY . .
RUN npm run build

FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --omit=dev
COPY --from=build /app/dist ./dist

EXPOSE 3334
CMD ["node", "dist/index.js"]