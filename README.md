# KoiBanx Challenge

This challenge is a REST service done wiht NodeJs + Express and MongoDb for KoiBanx

## Install

### Develop

Only for developing purpose, server and database are up and running in a Docker container.

If it is first time to execute this project and want to run in developer mode, run:

```
docker-compose build
docker-compose up
```

After run previus step, open a new console and install dependencies:

```
npm install
```

Once installed dependencies, server should be up and running in `http://localhost:3000`

### Other

If it is first time to execute this project and you want run with another resources than are given in the containers you just simply have to do the following:

```
npm install
npm start
```

After that server should be up and running in `http://localhost:3000`

## Seeder

For seed the database run:

```
npm run seed
```

## Test

For execute the test suit,

```
npm run test
```

Unit tests and end-to-end tests are all in the `/test` folder

## Assumption

- stores could not be duplicated, so cuit number was taken as an unique identifier
- user password given in the documentation (`password: test123`) is not the same as it was initialized in the project (`password: admin`). So if someone want to make some test with that user it should check to have the right credentials.

## Considerations

-
