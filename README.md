# DockBill (NodeJs Coding Test)

## Index

- [Introduction](https://github.com/PedroKruszynski/DockBill#introduction)
  - [Basic Requirements](https://github.com/PedroKruszynski/DockBill#requirements)
  - [Application dependencies](https://github.com/PedroKruszynski/DockBill#application-dependencies)
  - [Build docker image](https://github.com/PedroKruszynski/DockBill#build-docker-image)
  - [Running migrations](https://github.com/PedroKruszynski/DockBill#running-migrations)
  - [Running development](https://github.com/PedroKruszynski/DockBill#running-development)
  - [Running build](https://github.com/PedroKruszynski/DockBill#running-build)
  - [Running tests](https://github.com/PedroKruszynski/DockBill#running-tests)
- [ERD](https://github.com/PedroKruszynski/DockBill#entity-relationship-model)
- [Architecture](https://github.com/PedroKruszynski/DockBill#Architecture)
  - [Modules Folder](https://github.com/PedroKruszynski/DockBill#modules)
  - [Shared Folder](https://github.com/PedroKruszynski/DockBill#shared)
- [Amazon AWS](https://github.com/PedroKruszynski/DockBill#amazon-aws)
- [API](https://github.com/PedroKruszynski/DockBill#api-endpoints)


## Introduction

That application was developed for an challenge from Dock. Using NodeJs + Express + Typescript
The Objective are create a api for a system of management accouns
The project was created from a scaffold i use for my projects.

- [NodeJs:14](https://nodejs.org/en/) - NodeJs
- [Typescript:4.4](https://www.typescriptlang.org/) - Typescript
- [Yarn:1](https://yarnpkg.com/) - Yarn OR [NPM:1](https://www.npmjs.com/) - NPM
- [PostgreSQL:14](https://www.postgresql.org/)
But you can run the application with docker
- [Docker](https://www.docker.com/) - Docker
- [Docker Compose](https://docs.docker.com/compose/) - Docker Compose

### Application dependencies

You have to copy the '.env.example' file and rename to '.env'

### Build docker image

After create the .env file you can run these following commands to build the image.

``` bash
# Build a images need for the app
docker-compose build

# Run all containers
docker-compose up -d

# We have to run the migrations, so you have to enter on api container
docker exec -it api_dock_bill /bin/bash

# Now runs the following command to execute all migrations
npm run-script typeorm:migrations
```

### Running migrations

Exist scripts in the project root to execute
I prefer yarn but you can choice either npm.

``` bash
# install typescript dependencies
$ yarn

# run all migration
$ yarn typeorm:migrations
```

### Running development

Exist scripts in the project root to execute
I prefer yarn but you can choice either npm.

``` bash
# install typescript dependencies
$ yarn

# run typescript server
$ yarn dev:server
```

### Running build

Exist scripts in the project root to execute the build and execute
I prefer yarn but you can choice either npm.

``` bash
# build the application
$ yarn build

# run node server
$ yarn start
```

### Running tests

Exist scripts in the project root to execute all tests made with jest

``` bash

# run all tests of the application
$ yarn test

```

Will generate a folder label coverage, inside you will see a index.html
See data about all tests

## API Endpoints

All endpoints are describe on doc folder
Json for Insomnia

## Entity Relationship Model

- [ERD](https://whimsical.com/dockbill-MxzA9tE4HoW2SWuNrYMY6M) - ERD/DER on Whimsical

## Architecture

### Modules

- Modules for each **domain** of api;

- Each module have a **DTO** telling what is the data of the function;

- **Infra** folder with the typeorm **Repositories** and **Entities**, a **http** folder containing the **Controller** and **Routes** of api;

- **Repository** folder tell the **interface** of the Repository and a **fake** of that repository;

- **Services** folder contain all services of the module and the **fake** of the same;

### Shared

- **Container** folder are for register all singleton for the app and have a **Providers** folder for each provider of the app, that provider has a  **fakes** folder, **implemenations** folder and **model** folder

- **Errors** are interfaces for define a default error of the api

- **Infra** folder are for the **Http** folder, that folde define all **Routes** and start the api server; also have a typeorm folder inside have a config folder for the configuration of the database, a **Migrations** folder the database execute

## Amazon Aws

You can access a version of the api on that link

- [AWS](http://18.224.55.207:3333/) - Api

### Thank you! :)

For doubts email me `pedrokruszysnki@gmail.com`.
