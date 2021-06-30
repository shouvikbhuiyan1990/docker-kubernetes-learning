FROM node:alpine AS builder
WORKDIR '/app'
COPY package.json ./
RUN npm install
COPY . /app
RUN npm run build

FROM nginx
COPY --from=builder /app/build /usr/share/nginx/html

ENV PORT 80
EXPOSE 80
CMD [ "nginx", "-g", "daemon off;"]