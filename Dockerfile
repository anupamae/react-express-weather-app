# Stage 1: Build React App
FROM node:alpine as client

WORKDIR /app/client

COPY client/. ./

ENV GENERATE_SOURCEMAP=false

RUN npm install --silent && npm run --silent build

# Stage 2
FROM node:alpine

WORKDIR /app

COPY api/. ./

RUN npm install --silent

COPY --from=client /app/client/build/. ./build/

CMD ["npm", "start"]