FROM node:12-alpine as build

WORKDIR /app

COPY package.json /app/package.json

RUN npm install

COPY . ./

ARG REACT_APP_API_URL
ENV REACT_APP_API_URL $REACT_APP_API_URL

RUN npm run build

FROM nginx:1.16.0-alpine

COPY --from=build /app/build /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]
