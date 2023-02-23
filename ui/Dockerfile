# Stage 1
FROM node:14 as build-stage

WORKDIR /ui
COPY package.json .
RUN yarn install
COPY . .

ARG REACT_APP_API_BASE_URL
ENV REACT_APP_API_BASE_URL=$REACT_APP_API_BASE_URL

RUN yarn build

# Stage 2
FROM nginx:1.17.0-alpine

COPY --from=build-stage /ui/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE $REACT_DOCKER_PORT

CMD ["nginx", "-g", "daemon off;"]
