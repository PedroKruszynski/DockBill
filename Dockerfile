
FROM node:14

# create root application folder
WORKDIR /app

# copy configs to /app folder
COPY package*.json ./
COPY tsconfig.json ./
COPY .env ./

# copy source code to /app/src folder
COPY src /app/src

# check files list
RUN ls -a

RUN npm install
RUN npm run-script build

EXPOSE 3333

CMD [ "npm", "run-script", "start" ]
