FROM node:alpine

WORKDIR /user/app

# copy only package json as we don't want npm install to run on every code change
COPY package.json .
RUN npm install

# copy other source codes because we want latest code on every new container creation
COPY . .


CMD [ "npm", "start" ]