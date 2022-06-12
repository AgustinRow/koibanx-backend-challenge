FROM node:14.17.4-alpine as user
RUN apk add --no-cache git && \
    npm install npm@8.3.1 -g  && \
    mkdir /app && chown -R node:node /app && \
    mkdir /.npm /.config && chmod 777 /.npm /.config
USER node
WORKDIR /app

FROM user as app
COPY --chown=node . .
RUN npm install && npm run build

CMD [ "node", "app.js" ]
