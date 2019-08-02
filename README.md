[![Build Status](https://travis-ci.org/pasqualegabriel/tip-backend.svg?branch=master)](https://travis-ci.org/pasqualegabriel/tip-backend)

# TIP-BACKEND

University Proyect of TIP - UNQ

### Members

Number |       Name              | UNQ-Records |    EMail
-------|-------------------------|-------------|------------------------
  1    |                         |             | 
  2    |                         |             | 
  3    |                         |             | 

### Trello
[tip - trello](https://trello.com/b/AMlxjFNL/tip)

#### Installing node
Get the latest version of node from the [official website](https://nodejs.org/) or using [nvm](https://github.com/creationix/nvm)
Nvm approach is preferred.

#### Getting dependencies
- ```npm install```
- ```npm install -g sequelize sequelize-cli pg pg-hstore mysql2```

#### Database configuration
Before running the app, make sure you have [mysql installed](https://www.digitalocean.com/community/tutorials/how-to-install-mysql-on-ubuntu-16-04)

Then, set in `.env` some variables:
- `DB_HOST=localhost`
- `DB_PORT=3306`
- `DB_NAME=db_project_name`
- `DB_USERNAME=db_username`
- `DB_PASSWORD=db_pass`
- `NODE_API_DB_NAME_TEST=db_project_name_test`

**Remember not to push nor commit the `.env` file.**

Finally, run in a terminal (proyect base):
1. NODE_ENV=testing npm run create-db && NODE_ENV=testing npm run migrations
2. npm run create-db && npm run migrations 

### Model and Migration

To create a model with its migration, for example, run `sequelize model:generate --name user --attributes name:string,password:string,age:integer` 

### Migrations

To create a migration, run `sequelize migration:create --name="my-migration-name" --migrations-path ./migrations/migrations`.

To run them, execute `npm run migrations`.

#### Starting your app
Now, to start your app run ```npm start``` in the rootpath of the project. Then access your app at **localhost:port**. The port is logged in the console where you ran the start script.

#### Testing your app
Now, to test your app run ```npm test``` in the rootpath of the project.
