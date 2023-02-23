FROM node:12.17.0-alpine

# update packages
RUN apk update

# create root application folder
WORKDIR /api

# copy configs to /app folder
COPY package*.json ./
COPY tsconfig.json ./
# copy source code to /app/src folder
COPY src /api/src

# check files list
RUN ls -a

RUN npm install
RUN npm run build

EXPOSE 7777

CMD [ "node", "./dist/server.js" ]