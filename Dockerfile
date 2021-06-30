FROM node:alpine as builder
WORKDIR '/apps'
COPY package.json .
RUN npm install
COPY . .
RUN npm run build

FROM nginx
EXPOSE 80
COPY --from=builder /apps/build /usr/share/nginx/html