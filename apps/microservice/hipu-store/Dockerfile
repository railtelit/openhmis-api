#MICROSERVICE APPS
FROM --platform=arm64 node:16-alpine  as build
RUN apk update && apk add yarn python3 g++ make && rm -rf /var/cache/apk/*
ARG appname
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install 
COPY . .
#RUN npm run build:prod
RUN npx nx run microservice-${appname}:build --prod  


FROM --platform=amd64 keymetrics/pm2:16-alpine

WORKDIR /home
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
#RUN npm install --production --silent && mv node_modules ../
RUN npm install --production --silent 

ARG appname

ENV NODE_ENV=production
COPY --from=build /usr/src/app/dist/apps/microservice/${appname} .
COPY --from=build /usr/src/app/apps/microservice/${appname}/src/app/resource ./resource

COPY ["microservice-store.startup.sh","tsconfig.json" ,"./"]

# CMD [ "pm2-runtime","--no-auto-exit --watch", "start", "main.js" ]
CMD [ "/bin/sh", "/home/microservice-store.startup.sh"]
