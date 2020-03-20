# firexpress

A simple node skeleton built for writing REST APIs following best practices.

Contains basic CRUD operations, logger, middleware and schema validation.

## Requirements

- Docker and Docker Compose

## Getting Started

- Clone this repo `git clone https://github.com/mustanish/firexpress` then
- Run `docker-compose up -d` inside project root directory then
- Run `docker exec -it db bash` then
- Run `psql -U postgres` then
- Execute the entire SQL `https://github.com/mustanish/firexpress/blob/development/schema.sql` then
- Open `http://localhost:3000`

## Code Layout

The directory structure of the application:

    bin/                    Contains server startup logic

    configs/                Contains all configs used in application

    connectors/             Contains all connectors used in application

    constants/              Contains all constants used in application

    controllers/            Contains all controllers used in application

    middlewares/            Contains all middleware used in application

    models/                 Contains all models used in application

    routes/                 Contains all routes used in application

    schema/                 Contains all schema used in application

    utils/                  Contains all utilities used in application

## Available routes

    POST    http://localhost:3000/group      (Add Group)
    PATCH   http://localhost:3000/group/:id  (Update Group)
    DELETE  http://localhost:3000/group/:id  (Delete Group)
    GET     http://localhost:3000/group/:id  (Get single group)
    GET     http://localhost:3000/groups     (Get all groups)
