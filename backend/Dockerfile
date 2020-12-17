FROM node:12.18.3

LABEL version="1.0"
LABEL description="This is the base docker image for the Tweet Sentiment Analysis backend API."
LABEL maintainer = ["danielmurph8@gmail.com", "dylanedwards290@gmail.com"]

WORKDIR /app

COPY ["package.json", "package-lock.json", "./"]
RUN ls
RUN npm install --production
COPY . .

EXPOSE 5000

ENV NODE_ENV=production
ENV GOOGLE_APPLICATION_CREDENTIALS="/app/wse-api-294216-6a6d9ae2dd47.json"
ENV bearer_token='AAAAAAAAAAAAAAAAAAAAAGv2KAEAAAAABQR%2FBgSZz9ffjHdeyqlYO4%2BGjSs%3D3wG7qyIfhg0t8b7487utEXZ0H6sQJl3x65t8F3lAb39fwtsZWq'

CMD ["node", "backend.js"]