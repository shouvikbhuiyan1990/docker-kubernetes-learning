FROM node:alpine as Build
WORKDIR /app
COPY ./package.json ./
RUN npm install
COPY ./ ./
RUN npm run Build

FROM nginx
EXPOSE 3000
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=Build /app/build /usr/share/nginx/html
