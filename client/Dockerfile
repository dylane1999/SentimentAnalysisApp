FROM node:12.18.3

WORKDIR /app

COPY ["package.json", "package-lock.json", "./"]

RUN yarn install --production

COPY . /app

EXPOSE 3000

CMD ["yarn", "start"]